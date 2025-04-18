import { templates } from './templatesData.js';

// ----- Constants and Templates -----
const ADMIN_PASSWORD = "Abhihere12";

// ----- DOM Elements -----
const mainWheel = document.getElementById("main-wheel");
const templateModal = document.getElementById("template-modal");
const previewModal = document.getElementById("preview-modal");
const adminModal = document.getElementById("admin-modal");
const toast = document.getElementById("toast");
const templateForm = document.getElementById("template-form");
const modalTitle = document.getElementById("modal-title");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const backBtn = document.getElementById("back-btn");
const adminBtn = document.getElementById("admin-btn");
const loginForm = document.getElementById("login-form");
const adminPanel = document.getElementById("admin-panel");
const adminLogin = document.getElementById("admin-login");
const addTemplateBtn = document.getElementById("add-template-btn");
const templateEditor = document.getElementById("template-editor");
const editorForm = document.getElementById("editor-form");
const addFieldBtn = document.getElementById("add-field-btn");
const fieldsContainer = document.getElementById("fields-container");
const cancelEditorBtn = document.getElementById("cancel-editor");
const templateList = document.querySelector(".template-list");
const themeToggle = document.getElementById("theme-toggle");

// ----- Variables -----
let currentTemplate = null;
let formData = {};
let isEditing = false;
let editingTemplateId = null;
let currentCategory = null;

// ----- Initialize Application -----
document.addEventListener("DOMContentLoaded", () => {
  initializeTemplates();
  buildMainWheel();
  setupEventListeners();
  generateTemplateButtons();
});

// Ensure templates are loaded and visible
function initializeTemplates() {
  const savedTemplates = localStorage.getItem("emailTemplates");
  if (savedTemplates) {
    templates = JSON.parse(savedTemplates);
  }
}

// Build the main wheel with categories
function buildMainWheel() {
  const categories = [...new Set(templates.map(template => template.category))];
  const segmentAngle = 360 / categories.length;

  mainWheel.innerHTML = ""; // Clear the wheel

  categories.forEach((category, index) => {
    const segment = document.createElement("div");
    segment.className = "wheel-segment";
    segment.dataset.category = category;
    segment.style.transform = `rotate(${index * segmentAngle}deg)`;

    const content = document.createElement("div");
    content.className = "segment-content";
    content.innerHTML = `
      <i class="fas ${getCategoryIcon(category)}"></i>
      <div class="segment-label">${category}</div>
    `;

    segment.appendChild(content);
    mainWheel.appendChild(segment);

    segment.addEventListener("click", () => {
      showCategoryTemplates(category);
    });
  });
}

// Dynamically generate buttons for templates
function generateTemplateButtons() {
  const categories = [...new Set(templates.map(template => template.category))];

  categories.forEach(category => {
    // Dynamically create category containers if they don't exist
    let categoryContainer = document.querySelector(`.template-category[data-category="${category}"]`);
    if (!categoryContainer) {
      const container = document.createElement('div');
      container.className = 'template-category';
      container.setAttribute('data-category', category);
      container.innerHTML = `
        <h3 class="text-xl font-semibold">${category}</h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
      `;
      document.querySelector('main .content-container').appendChild(container);
      categoryContainer = container;
    }

    const grid = categoryContainer.querySelector('.grid');
    templates
      .filter(template => template.category === category)
      .forEach(template => {
        const buttonHTML = `
          <div class="royal-card p-5" onclick="openTemplateForm('${template.id}')">
            <h4 class="font-medium mb-2">${template.name}</h4>
            <p class="text-sm text-gray-300 mb-3">Use this template for ${template.name.toLowerCase()}</p>
            <button class="royal-button rounded-lg px-3 py-1.5 text-xs">
              Use Template
            </button>
          </div>
        `;
        grid.insertAdjacentHTML('beforeend', buttonHTML);
      });
  });
}

// Open the form for a specific template
function openTemplateForm(templateId) {
  const template = templates.find(t => t.id === templateId);
  if (!template) return;

  currentTemplate = template;
  formData = {};

  // Update modal title
  modalTitle.textContent = template.name;

  // Clear form
  templateForm.innerHTML = "";

  // Build form fields
  template.fields.forEach(field => {
    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label + (field.required ? " *" : "");

    const input = document.createElement("input");
    input.id = field.id;
    input.name = field.id;
    input.type = field.type;
    input.required = field.required;
    input.placeholder = field.placeholder || "";

    formGroup.appendChild(label);
    formGroup.appendChild(input);
    templateForm.appendChild(formGroup);
  });

  // Show modal
  templateModal.style.display = "block";
}

// Ensure admin can edit templates
function loadTemplateList() {
  templateList.innerHTML = ""; // Clear the template list

  templates.forEach(template => {
    const templateItem = document.createElement("div");
    templateItem.className = "template-item";
    templateItem.innerHTML = `
      <div class="template-info">
        <i class="fas ${template.icon}"></i>
        <div>
          <div class="template-name">${template.name}</div>
          <div class="template-category">${template.category}</div>
        </div>
      </div>
      <div class="template-actions">
        <button class="action-btn edit" data-id="${template.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete" data-id="${template.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    templateList.appendChild(templateItem);
  });

  // Add event listeners for edit and delete buttons
  document.querySelectorAll(".action-btn.edit").forEach(button => {
    button.addEventListener("click", () => {
      const templateId = button.dataset.id;
      editTemplate(templateId);
    });
  });

  document.querySelectorAll(".action-btn.delete").forEach(button => {
    button.addEventListener("click", () => {
      const templateId = button.dataset.id;
      if (confirm("Are you sure you want to delete this template?")) {
        deleteTemplate(templateId);
      }
    });
  });
}

// Ensure admin login works
function loginAdmin() {
  const password = document.getElementById("password").value;

  if (verifyAdminPassword(password)) {
    adminLogin.style.display = "none";
    adminPanel.style.display = "block";
    loadTemplateList();
  } else {
    showToast("Invalid password. Please try again.", "error");
  }
}

// Ensure templates are editable
function editTemplate(templateId) {
  editingTemplateId = templateId;
  showTemplateEditor(true);
}

// Save templates to localStorage
function saveTemplate() {
  const name = document.getElementById("template-name").value;
  const category = document.getElementById("template-category").value;
  const icon = document.getElementById("template-icon").value;
  const content = document.getElementById("template-content").value;

  const fields = [];
  const fieldItems = fieldsContainer.querySelectorAll(".field-item");

  fieldItems.forEach(item => {
    const label = item.querySelector(".field-label").value;
    const id = item.querySelector(".field-id").value;
    const type = item.querySelector(".field-type").value;
    const required = item.querySelector(".field-required").checked;

    fields.push({
      id,
      label,
      type,
      required,
      placeholder: `Enter ${label.toLowerCase()}`
    });
  });

  if (isEditing) {
    const index = templates.findIndex(t => t.id === editingTemplateId);
    if (index !== -1) {
      templates[index] = {
        ...templates[index],
        name,
        category,
        icon,
        content,
        fields
      };
      showToast("Template updated successfully!", "success");
    }
  } else {
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    if (templates.some(t => t.id === id)) {
      showToast("A template with this name already exists. Please choose a different name.", "error");
      return;
    }

    templates.push({
      id,
      name,
      category,
      icon,
      fields,
      content
    });

    showToast("Template added successfully!", "success");
  }

  localStorage.setItem("emailTemplates", JSON.stringify(templates));
  templateEditor.style.display = "none";
  loadTemplateList();
  buildMainWheel();
}

// ----- Build Wheel Functions -----
function getCategoryIcon(category) {
  // Return appropriate icon based on category
  switch (category) {
    case "Dev Phase Templates":
      return "fa-code";
    case "HTML Templates":
      return "fa-html5";
    case "Before Live Templates":
      return "fa-rocket";
    case "After Live Templates":
      return "fa-globe";
    case "Leave Templates":
      return "fa-calendar-days";
    case "Team Lead Tasks Template":
      return "fa-users-gear";
    case "Custom Templates":
      return "fa-puzzle-piece";
    default:
      return "fa-envelope";
  }
}

function showCategoryTemplates(category) {
  currentCategory = category;
  
  // Filter templates by category
  const categoryTemplates = templates.filter(template => template.category === category);
  const segmentAngle = 360 / categoryTemplates.length;
  
  // Clear wheel and add animation class
  mainWheel.innerHTML = "";
  mainWheel.classList.add("category-active");
  
  // Create segment for back button
  const backSegment = document.createElement("div");
  backSegment.className = "wheel-segment back-button";
  backSegment.style.transform = `rotate(0deg)`;
  
  const backContent = document.createElement("div");
  backContent.className = "segment-content";
  backContent.innerHTML = `
    <i class="fas fa-arrow-left"></i>
    <div class="segment-label">Back</div>
  `;
  
  backSegment.appendChild(backContent);
  mainWheel.appendChild(backSegment);
  
  // Add click event listener for back button
  backSegment.addEventListener("click", () => {
    mainWheel.classList.remove("category-active");
    buildMainWheel();
  });
  
  // Create a segment for each template in the category
  categoryTemplates.forEach((template, index) => {
    const segment = document.createElement("div");
    segment.className = "wheel-segment";
    segment.dataset.template = template.id;
    // Offset by one to account for back button
    segment.style.transform = `rotate(${(index + 1) * segmentAngle}deg)`;
    
    const content = document.createElement("div");
    content.className = "segment-content";
    content.innerHTML = `
      <i class="fas ${template.icon}"></i>
      <div class="segment-label">${template.name}</div>
    `;
    
    segment.appendChild(content);
    mainWheel.appendChild(segment);
    
    // Add click event listener
    segment.addEventListener("click", () => {
      openTemplateForm(template);
    });
  });
}

// ----- Template Form Functions -----
function generateEmail() {
  // Collect form data
  const formElements = templateForm.elements;
  for (let i = 0; i < formElements.length; i++) {
    const field = formElements[i];
    if (field.name) {
      formData[field.name] = field.value;
    }
  }
  
  // Generate email content
  let emailContent = currentTemplate.content;
  
  // Replace placeholders with form values
  for (const [key, value] of Object.entries(formData)) {
    emailContent = emailContent.replace(new RegExp(`{${key}}`, "g"), value);
  }
  
  // Handle conditional content with JavaScript expressions in curly braces
  emailContent = emailContent.replace(/{([^{}]*)}/g, (match, expr) => {
    try {
      // Only evaluate simple conditional expressions for security
      if (expr.includes("?") && expr.includes(":")) {
        // eslint-disable-next-line no-new-func
        return new Function("formData", `with(formData) { return ${expr}; }`)(formData);
      }
      return match; // Keep the original for non-conditional expressions
    } catch (error) {
      console.error("Error evaluating expression:", error);
      return match; // Return original on error
    }
  });
  
  // Display the generated email content
  document.getElementById("email-preview").textContent = emailContent;
  
  // Hide template modal and show preview modal
  templateModal.style.display = "none";
  previewModal.style.display = "block";
}

function copyToClipboard() {
  const emailPreview = document.getElementById("email-preview");
  const emailContent = emailPreview.textContent;
  
  navigator.clipboard.writeText(emailContent)
    .then(() => {
      showToast("Email copied to clipboard!", "success");
    })
    .catch(() => {
      showToast("Failed to copy email. Please try again.", "error");
    });
}

// ----- Admin Functions -----
function showAdminLogin() {
  adminModal.style.display = "block";
  adminLogin.style.display = "block";
  adminPanel.style.display = "none";
  templateEditor.style.display = "none";
  document.getElementById("password").value = "";
}

function verifyAdminPassword(password) {
  return password === ADMIN_PASSWORD;
}

// Add field to editor
function addFieldToEditor(fieldData = null) {
  const fieldItem = document.createElement("div");
  fieldItem.className = "field-item";
  
  // Field label input
  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.placeholder = "Field Label";
  labelInput.className = "field-label";
  labelInput.value = fieldData ? fieldData.label : "";
  labelInput.required = true;
  
  // Field ID input (generated from label)
  const idInput = document.createElement("input");
  idInput.type = "text";
  idInput.placeholder = "Field ID";
  idInput.className = "field-id";
  idInput.value = fieldData ? fieldData.id : "";
  
  // Update ID based on label
  labelInput.addEventListener("input", () => {
    idInput.value = labelInput.value.toLowerCase().replace(/[^a-z0-9]/g, "");
  });
  
  // Field type select
  const typeSelect = document.createElement("select");
  typeSelect.className = "field-type";
  
  const types = ["text", "textarea", "date", "email", "url", "number", "select"];
  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeSelect.appendChild(option);
  });
  
  if (fieldData) {
    typeSelect.value = fieldData.type;
  }
  
  // Required checkbox
  const requiredCheckbox = document.createElement("input");
  requiredCheckbox.type = "checkbox";
  requiredCheckbox.className = "field-required";
  requiredCheckbox.checked = fieldData ? fieldData.required : false;
  
  const requiredLabel = document.createElement("label");
  requiredLabel.textContent = "Required";
  requiredLabel.appendChild(requiredCheckbox);
  
  // Remove button
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "field-remove";
  removeButton.innerHTML = '<i class="fas fa-times"></i>';
  removeButton.addEventListener("click", () => {
    fieldItem.remove();
  });
  
  // Add all elements to field item
  fieldItem.appendChild(labelInput);
  fieldItem.appendChild(idInput);
  fieldItem.appendChild(typeSelect);
  fieldItem.appendChild(removeButton);
  
  // Add field item to container
  fieldsContainer.appendChild(fieldItem);
}

function showTemplateEditor(isEdit = false) {
  isEditing = isEdit;
  templateEditor.style.display = "block";
  document.getElementById("editor-title").textContent = isEdit ? "Edit Template" : "Add New Template";
  
  // Clear form
  document.getElementById("template-name").value = "";
  document.getElementById("template-icon").value = "fa-envelope";
  document.getElementById("template-content").value = "";
  fieldsContainer.innerHTML = "";
  
  if (isEdit) {
    // Populate form with template data
    const template = templates.find(t => t.id === editingTemplateId);
    if (template) {
      document.getElementById("template-name").value = template.name;
      document.getElementById("template-category").value = template.category;
      document.getElementById("template-icon").value = template.icon;
      document.getElementById("template-content").value = template.content;
      
      // Add fields
      template.fields.forEach(field => {
        addFieldToEditor(field);
      });
    }
  } else {
    // Add default field
    addFieldToEditor();
  }
}

function deleteTemplate(templateId) {
  // Remove template from array
  templates = templates.filter(template => template.id !== templateId);
  
  // Save to localStorage
  localStorage.setItem("emailTemplates", JSON.stringify(templates));
  
  // Reload template list
  loadTemplateList();
  
  // Rebuild main wheel if we're on the main view
  if (mainWheel.classList.contains("category-active")) {
    if (currentCategory) {
      showCategoryTemplates(currentCategory);
    }
  } else {
    buildMainWheel();
  }
  
  showToast("Template deleted successfully!", "success");
}

// ----- Utility Functions -----
function showToast(message, type = "success") {
  const toastIcon = toast.querySelector("i");
  const toastMessage = toast.querySelector(".toast-message");
  
  // Set icon based on type
  toastIcon.className = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle error";
  
  // Set message
  toastMessage.textContent = message;
  
  // Show toast
  toast.classList.add("show");
  
  // Hide toast after timeout
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function toggleTheme() {
  const isLightTheme = document.body.classList.toggle("light-theme");
  themeToggle.innerHTML = isLightTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
}

// ----- Event Listeners -----
function setupEventListeners() {
  // Close modals when clicking on the close button or outside the modal
  document.querySelectorAll(".close-modal, .close-btn").forEach(element => {
    element.addEventListener("click", () => {
      templateModal.style.display = "none";
      previewModal.style.display = "none";
      adminModal.style.display = "none";
    });
  });
  
  // Close modals when clicking outside of modal content
  window.addEventListener("click", (event) => {
    if (event.target === templateModal) {
      templateModal.style.display = "none";
    }
    if (event.target === previewModal) {
      previewModal.style.display = "none";
    }
    if (event.target === adminModal) {
      adminModal.style.display = "none";
    }
  });
  
  // Generate button click
  generateBtn.addEventListener("click", () => {
    if (templateForm.checkValidity()) {
      generateEmail();
    } else {
      templateForm.reportValidity();
    }
  });
  
  // Copy to clipboard button click
  copyBtn.addEventListener("click", copyToClipboard);
  
  // Back button click
  backBtn.addEventListener("click", () => {
    previewModal.style.display = "none";
    templateModal.style.display = "block";
  });
  
  // Admin button click
  adminBtn.addEventListener("click", showAdminLogin);
  
  // Login form submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginAdmin();
  });
  
  // Add template button click
  addTemplateBtn.addEventListener("click", () => {
    showTemplateEditor(false);
  });
  
  // Add field button click
  addFieldBtn.addEventListener("click", () => {
    addFieldToEditor();
  });
  
  // Cancel editor button click
  cancelEditorBtn.addEventListener("click", () => {
    templateEditor.style.display = "none";
  });
  
  // Editor form submit
  editorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveTemplate();
  });
  
  // Theme toggle click
  themeToggle.addEventListener("click", toggleTheme);
}

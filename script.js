document.addEventListener('DOMContentLoaded', () => {
    const templateButtons = document.querySelectorAll('.template-btn');
    const templateForm = document.querySelector('.template-form');
    const previewSection = document.querySelector('.preview-section');
    const emailForm = document.getElementById('emailForm');
    const generateEmailBtn = document.getElementById('generateEmail');
    const copyEmailBtn = document.getElementById('copyEmail');
    const emailPreview = document.getElementById('emailPreview');
    const dependenciesContainer = document.getElementById('dependenciesContainer');
    const addDependencyBtn = document.getElementById('addDependencyBtn');
    const bugReportSection = document.querySelector('.bug-report-section');

    let selectedTemplate = null;

    // Template selection
    templateButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            templateButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add 'selected' class to clicked button
            button.classList.add('selected');
            
            selectedTemplate = button.dataset.template;
            templateForm.style.display = 'block';
            previewSection.style.display = 'none';
            emailForm.reset();
            copyEmailBtn.disabled = true;
            
            // Hide all form sections first
            document.querySelectorAll('.form-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show/hide sections based on template
            const urlsSection = document.querySelector('.urls-section');
            const dependenciesSection = document.querySelector('.dependencies-section');
            const devicesSection = document.querySelector('.devices-section');
            const trackerSection = document.querySelector('.tracker-section');
            const basicInfoSection = document.querySelector('.form-section:first-of-type');
            const credentialsSection = document.querySelector('.credentials-section');
            const datesSection = document.querySelector('.dates-section');

            // Reset visibility
            urlsSection.style.display = 'none';
            dependenciesSection.style.display = 'none';
            devicesSection.style.display = 'none';
            trackerSection.style.display = 'none';
            credentialsSection.style.display = 'none';
            datesSection.style.display = 'none';
            if (bugReportSection) {
                bugReportSection.style.display = 'none';
            }
            
            // Check if it's a leave request template
            const isLeaveRequest = ['sick-leave', 'casual-leave', 'unpaid-leave'].includes(selectedTemplate);
            
            // Show basic info section only for non-leave request templates
            if (!isLeaveRequest) {
                basicInfoSection.style.display = 'block';
                datesSection.style.display = 'block';
            }
            
            if (selectedTemplate === 'sick-leave') {
                document.querySelector('.sick-leave-section').style.display = 'block';
            } else if (selectedTemplate === 'casual-leave') {
                document.querySelector('.casual-leave-section').style.display = 'block';
            } else if (selectedTemplate === 'unpaid-leave') {
                document.querySelector('.unpaid-leave-section').style.display = 'block';
            } else if (selectedTemplate === 'dev-testing-started') {
                urlsSection.style.display = 'block';
                dependenciesSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
            } else if (selectedTemplate === 'dev-testing-completed') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.dev-completed-section').style.display = 'block';
                document.querySelector('.image-limits-section').style.display = 'block';
                document.querySelector('.issue-stats-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
                document.querySelector('.working-days-section').style.display = 'block';
            } else if (selectedTemplate === 'dev-testing-rejected') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.dev-testing-rejected-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            } else if (selectedTemplate === 'dev-retesting-started') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.dev-retesting-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            } else if (selectedTemplate === 'dev-retesting-rejected') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.dev-retesting-rejected-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            } else if (selectedTemplate === 'html-comparison-completed') {
                if (bugReportSection) {
                    bugReportSection.style.display = 'block';
                }
            } else if (selectedTemplate === 'html-comparison-started') {
                urlsSection.style.display = 'block';
                credentialsSection.style.display = 'block';
            } else if (selectedTemplate === 'before-live-started') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.before-live-started-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            } else if (selectedTemplate === 'before-live-rejected') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.before-live-rejected-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            } else if (selectedTemplate === 'before-live-approval' || selectedTemplate === 'before-live-completed') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.before-live-approval-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            } else if (selectedTemplate === 'after-live-started') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.after-live-started-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            } else if (selectedTemplate === 'after-live-completed') {
                urlsSection.style.display = 'block';
                devicesSection.style.display = 'block';
                trackerSection.style.display = 'block';
                credentialsSection.style.display = 'block';
                document.querySelector('.after-live-completed-section').style.display = 'block';
                document.querySelector('.tools-browsers-section').style.display = 'block';
            }
        });
    });

    // Handle dependencies
    addDependencyBtn.addEventListener('click', () => {
        const newDependency = document.createElement('div');
        newDependency.className = 'dependency-item';
        newDependency.innerHTML = `
            <div class="custom-input">
                <i class="fas fa-tasks"></i>
                <input type="text" class="dependency-input" placeholder="Enter dependency">
            </div>
            <button type="button" class="remove-dependency-btn">
                <i class="fas fa-times"></i>
            </button>
        `;
        dependenciesContainer.appendChild(newDependency);

        // Add remove button handler
        const removeBtn = newDependency.querySelector('.remove-dependency-btn');
        removeBtn.addEventListener('click', () => {
            newDependency.remove();
        });
    });

    // Add remove button handler for initial dependency
    const initialRemoveBtn = document.querySelector('.remove-dependency-btn');
    if (initialRemoveBtn) {
        initialRemoveBtn.addEventListener('click', (e) => {
            const dependencyItems = document.querySelectorAll('.dependency-item');
            if (dependencyItems.length > 1) {
                e.target.closest('.dependency-item').remove();
            }
        });
    }

    // Back button
    const backButton = document.getElementById('backToForm');
    if (backButton) {
        backButton.addEventListener('click', () => {
            previewSection.style.display = 'none';
            templateForm.style.display = 'block';
        });
    }

    // Generate email
    generateEmailBtn.addEventListener('click', () => {
        const formData = {
            recipientName: document.getElementById('recipientName')?.value || '',
            projectName: document.getElementById('projectName')?.value || '',
            senderName: document.getElementById('senderName')?.value || '',
            startDate: document.getElementById('startDate')?.value || '',
        };

        // Collect leave request data
        if (selectedTemplate === 'sick-leave') {
            formData.employeeName = document.getElementById('sick_employeeName')?.value || '';
            formData.teamLeaderName = document.getElementById('sick_teamLeaderName')?.value || '';
            formData.designation = document.getElementById('sick_designation')?.value || '';
            formData.leaveDate = document.getElementById('sick_leaveDate')?.value || '';
            formData.leaveReason = document.getElementById('sick_leaveReason')?.value || '';
        } else if (selectedTemplate === 'casual-leave') {
            formData.employeeName = document.getElementById('casual_employeeName')?.value || '';
            formData.teamLeaderName = document.getElementById('casual_teamLeaderName')?.value || '';
            formData.designation = document.getElementById('casual_designation')?.value || '';
            formData.leaveDate = document.getElementById('casual_leaveDate')?.value || '';
            formData.leaveReason = document.getElementById('casual_leaveReason')?.value || '';
        } else if (selectedTemplate === 'unpaid-leave') {
            formData.employeeName = document.getElementById('unpaid_employeeName')?.value || '';
            formData.teamLeaderName = document.getElementById('unpaid_teamLeaderName')?.value || '';
            formData.designation = document.getElementById('unpaid_designation')?.value || '';
            formData.leaveDate = document.getElementById('unpaid_leaveDate')?.value || '';
            formData.leaveReason = document.getElementById('unpaid_leaveReason')?.value || '';
        } else if (selectedTemplate === 'dev-testing-started') {
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.username = document.getElementById('username').value;
            formData.password = document.getElementById('password').value;
            formData.dueDate = document.getElementById('dueDate').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;

            // Get dependencies
            formData.dependencies = Array.from(document.querySelectorAll('.dependency-input'))
                .map(input => input.value)
                .filter(value => value.trim() !== '');
        } else if (selectedTemplate === 'dev-testing-completed') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.language = document.getElementById('language').value;
            formData.sizeLimit = document.getElementById('sizeLimit').value;
            formData.maxUploadLimit = document.getElementById('maxUploadLimit').value;
            formData.totalIssues = document.getElementById('totalIssues').value;
            formData.bugsCount = document.getElementById('bugsCount').value;
            formData.deviationsCount = document.getElementById('deviationsCount').value;
            formData.funcBugsCount = document.getElementById('funcBugsCount').value;
            formData.htmlBugsCount = document.getElementById('htmlBugsCount').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.workingDays = document.getElementById('workingDays').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.username = document.getElementById('username').value;
            formData.password = document.getElementById('password').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.dueDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'dev-testing-rejected') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.criticalBugs = document.getElementById('criticalBugs').value;
            formData.totalIssues = document.getElementById('totalIssues').value;
            formData.bugsCount = document.getElementById('bugsCount').value;
            formData.newBugs = document.getElementById('newBugs').value;
            formData.otherBugs = document.getElementById('otherBugs').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.username = document.getElementById('username').value;
            formData.password = document.getElementById('password').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.endDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'dev-retesting-started') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.previousTotalIssues = document.getElementById('previousTotalIssues').value;
            formData.previousBugsCount = document.getElementById('previousBugsCount').value;
            formData.previousBugReportLink = document.getElementById('previousBugReportLink').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.username = document.getElementById('username').value;
            formData.password = document.getElementById('password').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.dueDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'dev-retesting-rejected') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.totalReopenedBugs = document.getElementById('totalReopenedBugs').value;
            formData.totalIssues = document.getElementById('totalIssues').value;
            formData.bugsCount = document.getElementById('bugsCount').value;
            formData.newBugs = document.getElementById('newBugs').value;
            formData.criticalBugs = document.getElementById('criticalBugs').value;
            formData.previousBugReportLink = document.getElementById('previousBugReportLink').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.username = document.getElementById('username').value;
            formData.password = document.getElementById('password').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.endDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'html-comparison-completed') {
            formData.bugCount = document.getElementById('bugCount').value;
            formData.deviationCount = document.getElementById('deviationCount').value;
            formData.suggestionCount = document.getElementById('suggestionCount').value;
            formData.correctionCount = document.getElementById('correctionCount').value;
            formData.htmlCount = document.getElementById('htmlCount').value;
            formData.performanceCount = document.getElementById('performanceCount').value;
            formData.totalBugs = calculateTotalBugs(formData);
        } else if (selectedTemplate === 'before-live-started') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.totalIssuesResolved = document.getElementById('totalIssuesResolved').value;
            formData.bugsFixed = document.getElementById('bugsFixed').value;
            formData.previousBugReportLink = document.getElementById('previousBugReportLink').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.username = document.getElementById('username').value;
            formData.password = document.getElementById('password').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.dueDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'before-live-rejected') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.reopenedBugs = document.getElementById('reopenedBugs').value;
            formData.majorBugs = document.getElementById('majorBugs').value;
            formData.criticalBugs = document.getElementById('criticalBugs').value;
            formData.totalIssues = document.getElementById('totalIssues').value;
            formData.bugsCount = document.getElementById('bugsCount').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.endDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'before-live-approval') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.criticalBugs = document.getElementById('criticalBugs').value;
            formData.majorBugs = document.getElementById('majorBugs').value;
            formData.minorBugs = document.getElementById('minorBugs').value;
            formData.performanceScore = document.getElementById('performanceScore').value;
            formData.accessibilityScore = document.getElementById('accessibilityScore').value;
            formData.seoScore = document.getElementById('seoScore').value;
            formData.totalIssues = document.getElementById('totalIssues').value;
            formData.bugsCount = document.getElementById('bugsCount').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.endDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'after-live-started') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.liveUrl = document.getElementById('liveUrl').value;
            formData.monitoringPeriod = document.getElementById('monitoringPeriod').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.totalIssues = document.getElementById('totalIssues').value;
            formData.bugsCount = document.getElementById('bugsCount').value;
            formData.previousBugReportLink = document.getElementById('previousBugReportLink').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.dueDate = document.getElementById('dueDate').value;
        } else if (selectedTemplate === 'after-live-completed') {
            formData.websiteName = document.getElementById('websiteName').value;
            formData.backendName = document.getElementById('backendName').value;
            formData.liveUrl = document.getElementById('liveUrl').value;
            formData.totalIssues = document.getElementById('totalIssues').value;
            formData.newBugs = document.getElementById('newBugs').value;
            formData.criticalBugs = document.getElementById('criticalBugs').value;
            formData.otherBugs = document.getElementById('otherBugs').value;
            formData.performanceScore = document.getElementById('performanceScore').value;
            formData.uptime = document.getElementById('uptime').value;
            formData.toolsList = document.getElementById('toolsList').value;
            formData.browsersList = document.getElementById('browsersList').value;
            formData.frontendUrl = document.getElementById('frontendUrl').value;
            formData.backendUrl = document.getElementById('backendUrl').value;
            formData.bugTrackerUrl = document.getElementById('bugTrackerUrl').value;
            formData.device1 = document.getElementById('device1').value;
            formData.device2 = document.getElementById('device2').value;
            formData.device3 = document.getElementById('device3').value;
            formData.startDate = document.getElementById('startDate').value;
            formData.endDate = document.getElementById('dueDate').value;
            formData.bugsCount = document.getElementById('bugsCount').value;
        }

        const emailContent = generateEmailContent(selectedTemplate, formData);
        emailPreview.innerHTML = emailContent;
        templateForm.style.display = 'none';
        previewSection.style.display = 'block';
        copyEmailBtn.disabled = false;
    });

    // Copy email to clipboard
    copyEmailBtn.addEventListener('click', () => {
        const emailText = emailPreview.innerText || emailPreview.textContent;
        navigator.clipboard.writeText(emailText)
            .then(() => {
                alert('Email copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy email: ', err);
                alert('Failed to copy email. Please try again.');
            });
    });

    // Email content generation based on template
    function generateEmailContent(template, formData) {
        const baseStyles = 'font-family: Arial, sans-serif; color: #333; line-height: 1.6;';
        const headingStyles = 'color: #2c3e50; margin: 20px 0 10px;';
        const tableStyles = 'width: 100%; border-collapse: collapse; margin: 15px 0;';
        const cellStyles = 'padding: 8px; border: 1px solid #ddd;';
        const headerCellStyles = 'padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;';

        if (template === 'sick-leave') {
            const leaveDate = new Date(formData.leaveDate);
            const formattedDate = leaveDate.toLocaleDateString('en-US', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
            });
            return `<div style="${baseStyles}">
                <h2 style="${headingStyles}">Subject: Sick Leave Request – ${formData.employeeName} – ${formattedDate}</h2>
                <p>Dear <strong>${formData.teamLeaderName}</strong>,</p>
                <p>I would like to inform you that my health is not well due to ${formData.leaveReason} and so would like to apply for 'Sick Leave' on ${formattedDate}. Looking forward to your approval.</p>
                <p style="margin-top: 20px;">Thanks in advance,<br><strong>${formData.employeeName}</strong><br>${formData.designation}</p>
            </div>`;
        } else if (template === 'casual-leave') {
            const leaveDate = new Date(formData.leaveDate);
            const formattedDate = leaveDate.toLocaleDateString('en-US', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
            });
            return `<div style="${baseStyles}">
                <h2 style="${headingStyles}">Subject: Casual Leave Request – ${formData.employeeName} – ${formattedDate}</h2>
                <p>Dear <strong>${formData.teamLeaderName}</strong>,</p>
                <p>I would like to inform you that I need to avail a casual leave due to ${formData.leaveReason} and so would like to apply for 'Casual Leave' on ${formattedDate}. Looking forward to your approval.</p>
                <p style="margin-top: 20px;">Thanks in advance,<br><strong>${formData.employeeName}</strong><br>${formData.designation}</p>
            </div>`;
        } else if (template === 'unpaid-leave') {
            const leaveDate = new Date(formData.leaveDate);
            const formattedDate = leaveDate.toLocaleDateString('en-US', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
            });
            return `<div style="${baseStyles}">
                <h2 style="${headingStyles}">Subject: Unpaid Leave Request – ${formData.employeeName} – ${formattedDate}</h2>
                <p>Dear <strong>${formData.teamLeaderName}</strong>,</p>
                <p>I would like to inform you that I need to avail an unpaid leave due to ${formData.leaveReason} and so would like to apply for 'Unpaid Leave' on ${formattedDate}. Looking forward to your approval.</p>
                <p style="margin-top: 20px;">Thanks in advance,<br><strong>${formData.employeeName}</strong><br>${formData.designation}</p>
            </div>`;
        }
        
        // Other templates would be handled here...
        // Default case if no template matches
        return 'Template not found';
    }
});

// Helper function to calculate total bugs for HTML comparison template
function calculateTotalBugs(data) {
    return parseInt(data.bugCount || 0) + 
           parseInt(data.deviationCount || 0) + 
           parseInt(data.suggestionCount || 0) + 
           parseInt(data.correctionCount || 0) + 
           parseInt(data.htmlCount || 0) + 
           parseInt(data.performanceCount || 0);
} 
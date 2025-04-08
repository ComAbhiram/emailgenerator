document.addEventListener('DOMContentLoaded', () => {
    const templateButtons = document.querySelectorAll('.template-btn');
    const templateForm = document.getElementById('emailForm');
    const emailPreview = document.getElementById('emailPreview');
    const previewSection = document.getElementById('previewSection');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    
    // Initialize form sections with error handling
    const formSections = {
        'common': document.querySelector('.basic-info-section'),
        'urls': document.querySelector('.urls-section'),
        'credentials': document.querySelector('.credentials-section'),
        'devices': document.querySelector('.devices-section'),
        'dates': document.querySelector('.dates-section'),
        'devTestingStarted': document.querySelector('.dev-testing-started-section'),
        'devTestingRejected': document.querySelector('.dev-testing-rejected-section'),
        'devRetesting': document.querySelector('.dev-retesting-section'),
        'devRetestingRejected': document.querySelector('.dev-retesting-rejected-section'),
        'devRetestingCompleted': document.querySelector('.dev-retesting-completed-section'),
        'beforeLiveStarted': document.querySelector('.before-live-started-section'),
        'beforeLiveRejected': document.querySelector('.before-live-rejected-section'),
        'beforeLiveApprovedWithBugs': document.querySelector('.before-live-approved-with-bugs-section'),
        'beforeLiveApproval': document.querySelector('.before-live-approval-section'),
        'afterLiveStarted': document.querySelector('.after-live-started-section'),
        'afterLiveCompleted': document.querySelector('.after-live-completed-section'),
        'toolsBrowsers': document.querySelector('.tools-browsers-section'),
        'workingDays': document.querySelector('.working-days-section'),
        'issueStats': document.querySelector('.issue-stats-section')
    };

    // Debug log for form sections
    console.log('Form sections:', Object.entries(formSections).map(([key, value]) => ({
        section: key,
        exists: value !== null
    })));

    let selectedTemplate = null;

    // Hide all form sections initially
    function hideAllSections() {
        Object.entries(formSections).forEach(([name, section]) => {
            if (section) {
                section.style.display = 'none';
                console.log(`Hiding section: ${name}`);
            } else {
                console.warn(`Section not found: ${name}`);
            }
        });
    }

    // Show specified sections
    function showSections(sectionNames) {
        console.log('Showing sections:', sectionNames);
        hideAllSections();
        sectionNames.forEach(name => {
            const section = formSections[name];
            if (section) {
                section.style.display = 'block';
                console.log(`Showing section: ${name}`);
            } else {
                console.warn(`Section not found: ${name}`);
            }
        });
    }

    // Template button click handler
    templateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const template = button.getAttribute('data-template');
            console.log('Template selected:', template);
            
            // Show form and hide preview
            if (templateForm) {
                templateForm.style.display = 'block';
            }
            if (previewSection) {
                previewSection.style.display = 'none';
            }
            
            // Show relevant sections based on template
            switch(template) {
                case 'dev-testing-started':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'devTestingStarted', 'toolsBrowsers', 'workingDays']);
                    break;
                case 'dev-testing-rejected':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'devTestingRejected', 'issueStats']);
                    break;
                case 'dev-retesting-started':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'devRetesting', 'toolsBrowsers', 'workingDays']);
                    break;
                case 'dev-retesting-rejected':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'devRetestingRejected', 'issueStats']);
                    break;
                case 'dev-retesting-completed':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'devRetestingCompleted', 'issueStats']);
                    break;
                case 'before-live-started':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'beforeLiveStarted', 'toolsBrowsers', 'workingDays']);
                    break;
                case 'before-live-rejected':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'beforeLiveRejected', 'issueStats']);
                    break;
                case 'before-live-approved-with-bugs':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'beforeLiveApprovedWithBugs', 'issueStats']);
                    break;
                case 'before-live-approval':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'beforeLiveApproval', 'issueStats']);
                    break;
                case 'after-live-started':
                    showSections(['common', 'urls', 'credentials', 'dates', 'afterLiveStarted', 'toolsBrowsers', 'workingDays']);
                    break;
                case 'after-live-completed':
                    showSections(['common', 'urls', 'credentials', 'devices', 'dates', 'afterLiveCompleted', 'issueStats']);
                    break;
                default:
                    showSections(['common']);
            }
            
            // Update active state of buttons
            templateButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Store selected template
            selectedTemplate = template;

            // Scroll to the first visible form field
            setTimeout(() => {
                const firstVisibleInput = document.querySelector('.form-section[style*="display: block"] input, .form-section[style*="display: block"] textarea');
                if (firstVisibleInput) {
                    firstVisibleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstVisibleInput.focus();
                }
            }, 100);
        });
    });

    // Add keyboard navigation between form fields
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const currentField = document.activeElement;
            if (currentField && (currentField.tagName === 'INPUT' || currentField.tagName === 'TEXTAREA')) {
                const allFields = Array.from(document.querySelectorAll('input, textarea'));
                const currentIndex = allFields.indexOf(currentField);
                if (currentIndex !== -1 && currentIndex < allFields.length - 1) {
                    const nextField = allFields[currentIndex + 1];
                    if (nextField && nextField.offsetParent !== null) { // Check if field is visible
                        nextField.focus();
                        nextField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        }
    });

    // Initialize with common section visible
    if (formSections.common) {
        showSections(['common']);
    } else {
        console.error('Common section not found in the DOM');
    }

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
        } else if (selectedTemplate === 'html-comparison-started') {
            return `<div style="${baseStyle} max-width: 800px; margin: 0 auto;">
                <h2 style="${headingStyles}; color: #f9c42f; text-align: center; font-size: 22px; border-bottom: 2px solid #f9c42f; padding-bottom: 10px;">Subject: HTML Comparison Test Started</h2>
                
                <p style="margin: 15px 0;">Dear <strong>${formData.recipientName}</strong>,</p>
                
                <p style="margin-bottom: 20px;">The HTML Comparison Test has been initiated. Below are the details for your reference:</p>
                
                <div style="${darkSection}">
                    <h3 style="${headingStyles}; color: #f9c42f; margin-top: 0;">Project Details</h3>
                    
                    <table style="${tableStyles}">
                        <tr>
                            <td style="${cellStyles} width: 30%; background-color: #333;"><strong>GitLab Repository:</strong></td>
                            <td style="${cellStyles}">${formData.repositoryName || 'Not specified'}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="${darkSection}">
                    <h3 style="${headingStyles}; color: #f9c42f; margin-top: 0;">Access Credentials</h3>
                    
                    <table style="${tableStyles}">
                        <tr>
                            <td style="${cellStyles} width: 30%; background-color: #333;"><strong>Test URL:</strong></td>
                            <td style="${cellStyles}">${formData.testUrl || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <td style="${cellStyles} background-color: #333;"><strong>Username:</strong></td>
                            <td style="${cellStyles}">${formData.username || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <td style="${cellStyles} background-color: #333;"><strong>Password:</strong></td>
                            <td style="${cellStyles}">${formData.password || 'Not specified'}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="${darkSection}">
                    <h3 style="${headingStyles}; color: #f9c42f; margin-top: 0;">Tools Being Used</h3>
                    
                    <table style="${tableStyles}">
                        <tr>
                            <td style="${cellStyles} width: 30%; background-color: #333;"><strong>Jam:</strong></td>
                            <td style="${cellStyles}">Bug Recording</td>
                        </tr>
                        <tr>
                            <td style="${cellStyles} background-color: #333;"><strong>GitLab:</strong></td>
                            <td style="${cellStyles}">Bug Reporting</td>
                        </tr>
                        <tr>
                            <td style="${cellStyles} background-color: #333;"><strong>Scrcpy:</strong></td>
                            <td style="${cellStyles}">Mobile Screen Mirroring</td>
                        </tr>
                        ${formData.toolsList ? `<tr>
                            <td style="${cellStyles} background-color: #333;"><strong>Other Tools:</strong></td>
                            <td style="${cellStyles}">${formData.toolsList}</td>
                        </tr>` : ''}
                    </table>
                </div>
                
                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div style="flex: 1; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #fd7e14;">
                        <h3 style="${headingStyles}; color: #fd7e14; margin-top: 0;">Test Environment</h3>
                        
                        <table style="${tableStyles}">
                            <tr>
                                <td style="${cellStyles} background-color: #e9ecef;"><strong>Operating Systems:</strong></td>
                                <td style="${cellStyles}">macOS, Linux, Android, iOS</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="flex: 1; background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #6f42c1;">
                        <h3 style="${headingStyles}; color: #6f42c1; margin-top: 0;">Browsers</h3>
                        
                        <table style="${tableStyles}">
                            <tr>
                                <td style="${cellStyles} background-color: #e9ecef;"><strong>Supported:</strong></td>
                                <td style="${cellStyles}">${formData.browsersList || 'Safari, Firefox, Brave, Chrome'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div style="${darkSection}">
                    <h3 style="${headingStyles}; color: #f9c42f; margin-top: 0;">Test Devices</h3>
                    
                    <ul style="list-style-type: none; padding-left: 5px; margin: 10px 0;">
                        <li style="margin-bottom: 8px; padding: 5px; background-color: #333; border-radius: 4px;">
                            <span style="display: inline-block; width: 20px; height: 20px; line-height: 20px; text-align: center; background-color: #20c997; color: white; border-radius: 50%; margin-right: 10px;">1</span>
                            <strong>${formData.device1 || 'MacBook Pro'}</strong>
                        </li>
                        ${formData.device2 ? `<li style="margin-bottom: 8px; padding: 5px; background-color: #333; border-radius: 4px;">
                            <span style="display: inline-block; width: 20px; height: 20px; line-height: 20px; text-align: center; background-color: #20c997; color: white; border-radius: 50%; margin-right: 10px;">2</span>
                            <strong>${formData.device2}</strong>
                        </li>` : ''}
                        ${formData.device3 ? `<li style="padding: 5px; background-color: #333; border-radius: 4px;">
                            <span style="display: inline-block; width: 20px; height: 20px; line-height: 20px; text-align: center; background-color: #20c997; color: white; border-radius: 50%; margin-right: 10px;">3</span>
                            <strong>${formData.device3}</strong>
                        </li>` : ''}
                    </ul>
                </div>
                
                <div style="${darkSection}">
                    <h3 style="${headingStyles}; color: #f9c42f; margin-top: 0;">Test Duration</h3>
                    
                    <table style="${tableStyles}">
                        <tr>
                            <td style="${cellStyles} width: 30%; background-color: #333;"><strong>Start Date:</strong></td>
                            <td style="${cellStyles}">${formatDate(formData.startDate) || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <td style="${cellStyles} background-color: #333;"><strong>End Date:</strong></td>
                            <td style="${cellStyles}">${formatDate(formData.endDate) || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <td style="${cellStyles} background-color: #333;"><strong>Total Days:</strong></td>
                            <td style="${cellStyles}">${formData.duration || 'Not specified'}</td>
                        </tr>
                    </table>
                </div>
                
                <p style="margin: 25px 0 15px 0;">Please feel free to reach out if you have any questions or need further information.</p>
                
                <p style="margin-top: 30px; border-top: 1px solid #dee2e6; padding-top: 15px;">Best regards,<br><strong style="color: #0056b3;">${formData.senderName || 'QA Team'}</strong></p>
            </div>`;
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
        // Helper function to format values and provide defaults
        function formatValue(value, defaultValue = '') {
            if (value === undefined || value === null || value === '') {
                return defaultValue;
            }
            return value;
        }
        
        // Clean up formData to prevent [object Object] or [undefined]
        Object.keys(formData).forEach(key => {
            if (formData[key] === undefined || formData[key] === null) {
                formData[key] = '';
            }
        });
        
        // Common email parts
        const greeting = `Hi Team,\n\n`;
        const signature = `\n\nBest Regards,\n${formatValue(formData.senderName)}`;
        
        // Template specific content
        switch(template) {
            case 'dev-testing-started':
                return {
                    subject: `[${formatValue(formData.projectName)}] Dev Testing Started`,
                    content: `${greeting}Please be informed that Dev Testing has been started for ${formatValue(formData.projectName)}.\n\n` +
                            `Testing Overview:\n` +
                            `Frontend URL: ${formatValue(formData.frontendUrl)}\n` +
                            `Backend URL: ${formatValue(formData.backendUrl)}\n` +
                            `Username: ${formatValue(formData.username)}\n` +
                            `Password: ${formatValue(formData.password)}\n` +
                            `GitLab Bug Tracker: ${formatValue(formData.gitlabUrl)}\n\n` +
                            `Pending Dependencies:\n` +
                            formatDependencies(formData) + '\n\n' +
                            `Testing Method: Manual Testing\n` +
                            `Testing Tools: Chrome Dev Tools, Postman\n\n` +
                            `Browsers Covered:\n` +
                            `- Chrome\n- Firefox\n- Safari\n- Edge\n\n` +
                            `Devices Used:\n` +
                            formatDevices(formData) + '\n\n' +
                            `Testing Timeline:\n` +
                            `Start Date: ${formatValue(formData.startDate)}\n` +
                            `Expected Due Date: ${formatValue(formData.dueDate)}\n\n` +
                            `Test Document:\n` +
                            `Name: ${formatValue(formData.testDocName)}\n` +
                            `Project Coordinator: ${formatValue(formData.pcName)}\n` +
                            `Team Lead: ${formatValue(formData.teamLeadName)}\n` +
                            `Approval Deadline: ${formatValue(formData.approvalDeadline)}\n\n` +
                            `Note: Please verify and approve the test document by the specified deadline.` +
                            signature
                };
                
            case 'before-live-approved-with-bugs':
                return {
                    subject: `[${formatValue(formData.projectName)}] Before Live Testing Approved with Bugs`,
                    content: `${greeting}Please be informed that Before Live Testing has been completed for ${formatValue(formData.projectName)} with the following bugs:\n\n` +
                            `Testing Overview:\n` +
                            `Frontend URL: ${formatValue(formData.frontendUrl)}\n` +
                            `Backend URL: ${formatValue(formData.backendUrl)}\n` +
                            `Username: ${formatValue(formData.username)}\n` +
                            `Password: ${formatValue(formData.password)}\n\n` +
                            `Bug Summary:\n` +
                            `Total Bugs: ${formatValue(formData.totalBugs, '0')}\n` +
                            `Functional Bugs: ${formatValue(formData.functionalBugs, '0')}\n` +
                            `HTML Bugs: ${formatValue(formData.htmlBugs, '0')}\n` +
                            `SEO Bugs: ${formatValue(formData.seoBugs, '0')}\n` +
                            `Bug Report Link: ${formatValue(formData.bugReportLink)}\n\n` +
                            `Testing Timeline:\n` +
                            `Start Date: ${formatValue(formData.startDate)}\n` +
                            `End Date: ${formatValue(formData.endDate)}\n` +
                            `Duration: ${formatValue(formData.duration)}\n\n` +
                            `Note: Please review and fix the reported bugs.` +
                            signature
                };
                
            // ... existing templates ...
        }
    }

    // Helper function to format dependencies
    function formatDependencies(formData) {
        let dependencies = '';
        for (let i = 1; i <= 4; i++) {
            const dep = formData[`dependency${i}`];
            if (dep) {
                dependencies += `${i}. ${dep}\n`;
            }
        }
        return dependencies || 'No pending dependencies';
    }

    // Helper function to format devices
    function formatDevices(formData) {
        let devices = '';
        for (let i = 1; i <= 3; i++) {
            const device = formData[`device${i}`];
            const os = formData[`deviceOs${i}`];
            if (device && os) {
                devices += `${i}. ${device} (${os})\n`;
            }
        }
        return devices || 'No devices specified';
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

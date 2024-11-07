// Function to handle form submission
function handleFormSubmit(event) {
    var _a;
    event.preventDefault();
    var profilePictureFile = (_a = document.getElementById('profile-picture').files) === null || _a === void 0 ? void 0 : _a[0];
    var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
    var resumeData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        skills: document.getElementById('skills').value.trim().split('\n'),
        education: document.getElementById('education').value.trim(),
        experience: {
            company: document.getElementById('company-name').value.trim(),
            designation: document.getElementById('designation-name').value.trim(),
            details: document.getElementById('experience-details').value.trim(),
        },
        languages: document.getElementById('languages').value.trim().split('\n'),
        profilePicture: profilePictureURL,
    };
    var resumeId = Date.now().toString();
    localStorage.setItem("resume-".concat(resumeId), JSON.stringify(resumeData));
    var shareableLink = "".concat(window.location.origin, "/resume.html?id=").concat(resumeId);
    generateResumePreview(resumeData, shareableLink);
}
// Function to generate and display the editable resume preview
function generateResumePreview(data, shareableLink) {
    var previewElement = document.getElementById('resume-preview');
    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }
    previewElement.scrollIntoView({ behavior: 'smooth' });
    previewElement.innerHTML = "\n        <div>\n            <h2>Editable Resume by Aiysha Noor</h2>\n            ".concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" id=\"profile-picture-preview\" alt=\"Profile Picture\">") : '', "\n            <section class=\"sec1\">\n                <h2>").concat(data.name, "</h2>\n                <p><strong>Email:</strong> ").concat(data.email, "</p>\n                <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n                <p><strong>Address:</strong> ").concat(data.address, "</p>\n            </section>\n            <section class=\"sec2\">\n                <h3>Education</h3>\n                <p>").concat(data.education, "</p>\n                <h3>Experience</h3>\n                <p><strong>Company:</strong> ").concat(data.experience.company, "</p>\n                <p><strong>Designation:</strong> ").concat(data.experience.designation, "</p>\n                <p><strong>Details:</strong> ").concat(data.experience.details, "</p>\n                <h3>Skills</h3>\n                <p>").concat(data.skills.join(', '), "</p>\n                <h3>Languages</h3>\n                <p>").concat(data.languages.join(', '), "</p>\n            </section>\n            <h3>Shareable Link:</h3>\n            <input type=\"text\" value=\"").concat(shareableLink, "\" readonly />\n        </div>\n    ");
}
// Initialize form when the document is fully loaded
window.addEventListener('DOMContentLoaded', function () {
    var _a;
    (_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleFormSubmit);
});

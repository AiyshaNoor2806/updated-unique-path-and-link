var _a;
function handleFormSubmit(event) {
    event.preventDefault();
    var profilePictureInput = document.getElementById('profile-picture');
    var profilePictureFile = (profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.files) ? profilePictureInput.files[0] : null;
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
    var shareableLink = "".concat(window.location.origin, "/resume.html?id=").concat(Date.now());
    generateResumePreview(resumeData, shareableLink);
}
function generateResumePreview(data, shareableLink) {
    var previewElement = document.getElementById('resume-preview');
    previewElement.innerHTML = "\n        <div>\n            <h2>Editable Resume by Aiysha Noor</h2>\n            ".concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" id=\"profile-picture-preview\" alt=\"Profile Picture\">") : '', "\n            <section>\n                <h3>").concat(data.name, "</h3>\n                <p><strong>Email:</strong> ").concat(data.email, "</p>\n                <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n                <p><strong>Address:</strong> ").concat(data.address, "</p>\n            </section>\n            <section>\n                <h3>Education</h3>\n                <p>").concat(data.education, "</p>\n            </section>\n            <section>\n                <h3>Experience</h3>\n                <p><strong>Company:</strong> ").concat(data.experience.company, "</p>\n                <p><strong>Designation:</strong> ").concat(data.experience.designation, "</p>\n                <p><strong>Details:</strong> ").concat(data.experience.details, "</p>\n            </section>\n            <section>\n                <h3>Skills</h3>\n                <ul>").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n            </section>\n            <section>\n                <h3>Languages</h3>\n                <ul>").concat(data.languages.map(function (lang) { return "<li>".concat(lang, "</li>"); }).join(''), "</ul>\n            </section>\n            <section>\n                <h3>Shareable Link:</h3>\n                <input type=\"text\" value=\"").concat(shareableLink, "\" readonly />\n            </section>\n        </div>\n    ");
}
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleFormSubmit);

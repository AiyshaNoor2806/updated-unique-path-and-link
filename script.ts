interface ResumeData {
    name: string;
    email: string;
    phone: string;
    address: string;
    skills: string[];
    education: string;
    experience: {
        company: string;
        designation: string;
        details: string;
    };
    languages: string[];
    profilePicture?: string;
}

// Function to handle form submission
function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const profilePictureFile = (document.getElementById('profile-picture') as HTMLInputElement).files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

    const resumeData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('address') as HTMLInputElement).value.trim(),
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value.trim().split('\n'),
        education: (document.getElementById('education') as HTMLTextAreaElement).value.trim(),
        experience: {
            company: (document.getElementById('company-name') as HTMLInputElement).value.trim(),
            designation: (document.getElementById('designation-name') as HTMLInputElement).value.trim(),
            details: (document.getElementById('experience-details') as HTMLTextAreaElement).value.trim(),
        },
        languages: (document.getElementById('languages') as HTMLTextAreaElement).value.trim().split('\n'),
        profilePicture: profilePictureURL,
    };

    const resumeId = Date.now().toString();
    localStorage.setItem(`resume-${resumeId}`, JSON.stringify(resumeData));

    const shareableLink = `${window.location.origin}/resume.html?id=${resumeId}`;
    generateResumePreview(resumeData, shareableLink);
}

// Function to generate and display the editable resume preview
function generateResumePreview(data: ResumeData, shareableLink: string): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;

    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }

    previewElement.scrollIntoView({ behavior: 'smooth' });

    previewElement.innerHTML = `
        <div>
            <h2>Editable Resume by Aiysha Noor</h2>
            ${data.profilePicture ? `<img src="${data.profilePicture}" id="profile-picture-preview" alt="Profile Picture">` : ''}
            <section class="sec1">
                <h2>${data.name}</h2>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Address:</strong> ${data.address}</p>
            </section>
            <section class="sec2">
                <h3>Education</h3>
                <p>${data.education}</p>
                <h3>Experience</h3>
                <p><strong>Company:</strong> ${data.experience.company}</p>
                <p><strong>Designation:</strong> ${data.experience.designation}</p>
                <p><strong>Details:</strong> ${data.experience.details}</p>
                <h3>Skills</h3>
                <p>${data.skills.join(', ')}</p>
                <h3>Languages</h3>
                <p>${data.languages.join(', ')}</p>
            </section>
            <h3>Shareable Link:</h3>
            <input type="text" value="${shareableLink}" readonly />
        </div>
    `;
}

// Initialize form when the document is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('resume-form')?.addEventListener('submit', handleFormSubmit);
});

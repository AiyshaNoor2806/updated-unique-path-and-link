function handleFormSubmit(event: Event): void {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
    const profilePictureFile = profilePictureInput?.files ? profilePictureInput.files[0] : null;
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

    const resumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('address') as HTMLInputElement).value.trim(),
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value.trim().split('\n'),
        education: (document.getElementById('education') as HTMLInputElement).value.trim(),
        experience: {
            company: (document.getElementById('company-name') as HTMLInputElement).value.trim(),
            designation: (document.getElementById('designation-name') as HTMLInputElement).value.trim(),
            details: (document.getElementById('experience-details') as HTMLTextAreaElement).value.trim(),
        },
        languages: (document.getElementById('languages') as HTMLTextAreaElement).value.trim().split('\n'),
        profilePicture: profilePictureURL,
    };

    const shareableLink = `${window.location.origin}/resume.html?id=${Date.now()}`;
    generateResumePreview(resumeData, shareableLink);
}

function generateResumePreview(data: {
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
    profilePicture: string;
}, shareableLink: string): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;

    previewElement.innerHTML = `
        <div>
            <h2>Editable Resume by Aiysha Noor</h2>
            ${data.profilePicture ? `<img src="${data.profilePicture}" id="profile-picture-preview" alt="Profile Picture">` : ''}
            <section>
                <h3>${data.name}</h3>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Address:</strong> ${data.address}</p>
            </section>
            <section>
                <h3>Education</h3>
                <p>${data.education}</p>
            </section>
            <section>
                <h3>Experience</h3>
                <p><strong>Company:</strong> ${data.experience.company}</p>
                <p><strong>Designation:</strong> ${data.experience.designation}</p>
                <p><strong>Details:</strong> ${data.experience.details}</p>
            </section>
            <section>
                <h3>Skills</h3>
                <ul>${data.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            </section>
            <section>
                <h3>Languages</h3>
                <ul>${data.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
            </section>
            <section>
                <h3>Shareable Link:</h3>
                <input type="text" value="${shareableLink}" readonly />
            </section>
        </div>
    `;
}

document.getElementById('resume-form')?.addEventListener('submit', handleFormSubmit);

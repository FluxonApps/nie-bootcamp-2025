// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const Profile: React.FC = () => {
//   return (
//     <>
//       <Header />
//       <div style={{ padding: "2rem", minHeight: "70vh" }}>
//         <h1>👤 Set Your Profile</h1>
//         <p>Update your personal information and preferences here.</p>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Profile;


// import React, { useState, useRef } from "react";
// import "./Profile.css";

// interface SocialLinks {
//   linkedin: string;
//   github: string;
//   twitter: string;
// }

// interface EducationItem {
//   branchOfStudy: string;
//   year: number | "";
// }

// interface ProfileProps {
//   initial: {
//     name: string;
//     username: string;
//     email: string;
//     profilePicture: string;
//     location: string;
//     about: string;
//     skills: string[];
//     socialLinks: SocialLinks;
//     education: EducationItem[];
//   };
//   onSubmit: (data: any) => void;
// }

// const defaultSocialLinks: SocialLinks = { linkedin: "", github: "", twitter: "" };

//  const Profile: React.FC<ProfileProps> = ({ initial, onSubmit }) => {
//   const [form, setForm] = useState({ ...initial });
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Handle generic field changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle array fields like skills
//   const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm(prev => ({
//       ...prev,
//       skills: e.target.value.split(",").map(s => s.trim()),
//     }));
//   };

//   // Handle social links
//   const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       socialLinks: { ...prev.socialLinks, [name]: value },
//     }));
//   };

//   // Handle education
//   const handleEducationChange = (i: number, field: string, value: string) => {
//     setForm(prev => ({
//       ...prev,
//       education: prev.education.map((edu, idx) =>
//         idx === i ? { ...edu, [field]: field === "year" ? Number(value) : value } : edu
//       ),
//     }));
//   };

//   // Profile picture selection
//   const handleProfilePicClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       // For production apps, upload the file to server or cloud storage.
//       // For demo here, just show local preview URL:
//       setForm(prev => ({
//         ...prev,
//         profilePicture: URL.createObjectURL(e.target.files![0])
//       }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <form className="profile-form" onSubmit={handleSubmit}>
//       <h2>Update Profile</h2>
//       <div className="profile-section">
//         <div className="profile-pic-block">
//           <img
//             src={form.profilePicture || "/default-avatar.png"}
//             alt="Profile"
//             className="profile-pic"
//             onClick={handleProfilePicClick}
//             title="Click to change profile photo"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleProfilePicChange}
//           />
//         </div>
//         <div className="fields-block">
//           <label>
//             Name
//             <input name="name" value={form.name} onChange={handleChange} required />
//           </label>
//           <label>
//             Username
//             <input name="username" value={form.username} disabled className="faded" />
//           </label>
//           <label>
//             Email
//             <input name="email" value={form.email} disabled className="faded" />
//           </label>
//           <label>
//             Location
//             <input name="location" value={form.location} onChange={handleChange} />
//           </label>
//         </div>
//       </div>
//       <label>
//         About
//         <textarea name="about" value={form.about} onChange={handleChange} rows={3} />
//       </label>

//       <label>
//         Skills (comma-separated)
//         <input name="skills" value={form.skills.join(", ")} onChange={handleSkillsChange} />
//       </label>

//       <div className="row-label">
//         Social Links
//         <div className="row-group">
//           <input
//             name="linkedin"
//             placeholder="LinkedIn"
//             value={form.socialLinks.linkedin}
//             onChange={handleSocialChange}
//           />
//           <input
//             name="github"
//             placeholder="Github"
//             value={form.socialLinks.github}
//             onChange={handleSocialChange}
//           />
//           <input
//             name="twitter"
//             placeholder="Twitter"
//             value={form.socialLinks.twitter}
//             onChange={handleSocialChange}
//           />
//         </div>
//       </div>

//       <div className="row-label">
//         Education
//         {form.education.map((edu, i) => (
//           <div className="row-group" key={i}>
//             <input
//               placeholder="Branch of Study"
//               value={edu.branchOfStudy}
//               onChange={e => handleEducationChange(i, "branchOfStudy", e.target.value)}
//             />
//             <input
//               placeholder="Year"
//               type="number"
//               value={edu.year}
//               onChange={e => handleEducationChange(i, "year", e.target.value)}
//             />
//           </div>
//         ))}
//       </div>
//       <button type="submit" className="save-btn">Save Changes</button>
//     </form>
//   );
// };

// export default Profile;

import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import Header from "../components/Header";
import Footer from "../components/Footer";





const defaultProfileData = {
  name: "",
  username: "",
  email: "",
  profilePicture: "",
  location: "",
  about: "",
  skills: [] as string[],
  socialLinks: { linkedin: "", github: "", twitter: "" },
  education: [{ branchOfStudy: "", year: "" }],
};

const Profile: React.FC = () => {
  const [form, setForm] = useState({ ...defaultProfileData });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  



// In the render/return block, just above the form fields:
{success && <div className="profile-status success">Saved!</div>}


  // Replace with logic to get current user's ID (from context, auth, etc.)
  const id = "68b82142c44844746251f835";

  // Fetch user data when component mounts
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8002/api/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then(data => {
        // Fill empty fields if missing (for safety)
        setForm({
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          profilePicture: data.profilePicture || "",
          location: data.location || "",
          about: data.about || "",
          skills: Array.isArray(data.skills) ? data.skills : [],
          socialLinks: { linkedin: "", github: "", twitter: "", ...data.socialLinks },
          education: Array.isArray(data.education) && data.education.length
            ? data.education
            : [{ branchOfStudy: "", year: "" }],
        });
        setLoading(false);
        setError(null);
      })
      .catch(err => {
  console.error(err);
  setError("Profile fetch failed.");
  setLoading(false);
});

  }, [id]);

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      skills: e.target.value.split(",").map(s => s.trim()),
    }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleEducationChange = (i: number, field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      education: prev.education.map((edu, idx) =>
        idx === i ? { ...edu, [field]: field === "year" ? Number(value) : value } : edu
      ),
    }));
  };

  // Profile picture selection
  const handleProfilePicClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // For demo: update preview only.
      setForm(prev => ({
        ...prev,
        profilePicture: URL.createObjectURL(file)
      }));
      // For real apps: Upload file to server/cloud and set the real URL in form.profilePicture
    }
  };

  // Submit updated profile
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    // Send PUT to backend
    fetch(`http://localhost:8002/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(data => {
        setForm(data);
        setSuccess(true);
        setError(null);
      })
      .catch(() => setError("Profile update failed."))
      .finally(() => setSaving(false));
  };

  if (loading) return <div className="profile-status">Loading...</div>;
  if (error) return <div className="profile-status error">{error}</div>;

  return (
  <div>
    <Header />
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      {success && <div className="profile-status success">Profile updated successfully!</div>}

      <div className="profile-section">
        <div className="profile-pic-block">
          <img
            src={form.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="profile-pic"
            onClick={handleProfilePicClick}
            title="Click to change profile photo"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
          />
        </div>
        <div className="fields-block">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Username
            <input name="username" value={form.username} disabled className="faded" />
          </label>
          <label>
            Email
            <input name="email" value={form.email} disabled className="faded" />
          </label>
          <label>
            Location
            <input name="location" value={form.location} onChange={handleChange} />
          </label>
        </div>
      </div>
      <label>
        About
        <textarea name="about" value={form.about} onChange={handleChange} rows={3} />
      </label>

      <label>
        Skills (comma-separated)
        <input name="skills" value={form.skills.join(", ")} onChange={handleSkillsChange} />
      </label>

      <div className="row-label">
        Social Links
        <div className="row-group">
          <input
            name="linkedin"
            placeholder="LinkedIn"
            value={form.socialLinks.linkedin}
            onChange={handleSocialChange}
          />
          <input
            name="github"
            placeholder="Github"
            value={form.socialLinks.github}
            onChange={handleSocialChange}
          />
          <input
            name="twitter"
            placeholder="Twitter"
            value={form.socialLinks.twitter}
            onChange={handleSocialChange}
          />
        </div>
      </div>

      <div className="row-label">
        Education
        {form.education.map((edu, i) => (
          <div className="row-group" key={i}>
            <input
              placeholder="Branch of Study"
              value={edu.branchOfStudy}
              onChange={e => handleEducationChange(i, "branchOfStudy", e.target.value)}
            />
            <input
              placeholder="Year"
              type="number"
              value={edu.year}
              onChange={e => handleEducationChange(i, "year", e.target.value)}
            />
          </div>
        ))}
      </div>
      <button type="submit" className="save-btn" disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
    <Footer />
  </div>
  );
};

export default Profile;

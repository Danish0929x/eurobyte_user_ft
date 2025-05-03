import React, { useEffect, useState } from "react";
import "./style.css";
import { getUserProfile, updateUserProfile } from "../../service/User";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Loader2 from "../../components/loader/Loader2";
import { FiCopy } from "react-icons/fi";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [profileData, setProfileData] = useState({
    selectedFile: null,
    name: "",
    userId: "",
    phone: "",
    email: "",
    walletAddress: "",
    image: "",
  });

  const fetchProfileDetails = async () => {
    setIsLoading(true);
    try {
      const profileDetails = await getUserProfile();
      setProfileData(prev => ({
        ...prev,
        userId: profileDetails.data.userId,
        name: profileDetails.data.fullname,
        phone: profileDetails.data.phone || "",
        email: profileDetails.data.email,
        walletAddress: profileDetails.data.withdrawAddress || "",
      }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleCancelClick = () => {
    setIsEdit(false);
    fetchProfileDetails();
  };

  const handleSaveClick = async () => {
    setIsSubmitting(true);
    try {
      const updatePayload = {
        fullname: profileData.name,
        withdrawalAddress: profileData.walletAddress,
        phone: profileData.phone,
      };

      await updateUserProfile(updatePayload);
      toast.success("Profile updated successfully!");
      setIsEdit(false);
      fetchProfileDetails();
    } catch (error) {
      toast.error("Failed to update profile!");
      console.error("Update error:", error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const referralLink = `${window.location.origin}/dashboard/register?r=${profileData.userId}`;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="deposit">
            <h1 className="main-heading">Referral Link</h1>
            {isSubmitting && <Loader2 />}

            <div className="adpa-first">
              <div className="adpafi-top">
                <h2>Referral Link</h2>
              </div>
              <div className="adpafi-body">
                <div className="input-group referral-copy-group">
                  <label>Your Referral Link</label>
                  <div className="referral-copy-wrapper">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      onClick={() => {
                        navigator.clipboard.writeText(referralLink);
                        toast.success("Referral link copied!");
                      }}
                    />
                    <button className="copy-button" type="button">
                      <FiCopy size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="deposit">
            <h1 className="main-heading">Profile</h1>

            <div className="adpa-first">
              <div className="adpafi-top">
                <h2>Profile Info</h2>
              </div>

              <div className="adpafi-body">
                <div className="input-group">
                  <label>User ID</label>
                  <input
                    type="text"
                    name="userId"
                    value={profileData.userId}
                    disabled
                  />
                </div>

                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEdit}
                    maxLength="20"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEdit}
                  />
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={profileData.email}
                    disabled
                  />
                </div>

                <div className="input-group">
                  <label>Wallet Address</label>
                  <input
                    type="text"
                    name="walletAddress"
                    value={profileData.walletAddress}
                    onChange={handleInputChange}
                    disabled={!isEdit}
                    placeholder="Paste your wallet address here"
                  />
                </div>

                <div className="button-group">
                  {isEdit ? (
                    <>
                      <button type="button" onClick={handleSaveClick}>
                        Save
                      </button>
                      <button type="button" onClick={handleCancelClick}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={handleEditClick}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;

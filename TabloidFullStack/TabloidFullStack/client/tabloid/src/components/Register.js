import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";
import { AvatarImageSelectorModal } from "./AvatarImage/AvatarImageSelectorModal.js";


export default function Register({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleImageSelect = (image) => {
    setImageLocation(image.imageLocation);
    toggleModal();
  };

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { 
        displayName: displayName, 
        firstName: firstName, 
        lastName: lastName, 
        email: email,
        imageLocation: imageLocation
       }
      try {
      register(userProfile, password)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
      } catch (error) {
        console.error("There was an error while trying to register:", error);
      }
    }
 };

  return (
    <>
    <h1 style={{textAlign: "center", fontWeight: "bolder", fontSize: "45px"}}>Register</h1>
    <Form onSubmit={registerClick}
          style={{margin: "auto", marginTop: "2rem", width: "55vw", display: "flex", justifyContent: "center"}}>
      <fieldset style={{display: "block", width: "100%" }}>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup style={{margin: "2.5rem 0 2.5rem 0", padding: "0.25rem 0 2rem 0"}}>
          <Label htmlFor="imageLocation" style={{display: "block", marginBottom: "1rem"}}>Profile Image</Label>
            {imageLocation ? (
              <div>
                <img src={imageLocation} alt="Selected" style={{ width: '100px', height: '100px', display: "block", margin: "0.25rem 0 1.25rem" }} />
                <Button color="secondary" onClick={toggleModal}>Change Avatar</Button>
              </div>
            ) : (
              <Button color="primary" onClick={toggleModal}>Select An Avatar</Button>
            )}
            <Input id="imageLocation" type="text" value={imageLocation} onChange={e => setImageLocation(e.target.value)} style={{ display: 'none' }} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup style={{display: "flex", justifyContent: "center"}}>
          <Button color="success" size="lg">Register</Button>
        </FormGroup>
      </fieldset>
      <AvatarImageSelectorModal isOpen={modalOpen} toggle={toggleModal} onSelect={handleImageSelect} />
    </Form>
    </>
  );
}
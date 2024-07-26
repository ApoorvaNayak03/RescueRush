'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #b3e0ff, #ffffff);
`;

const Card = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 40px;
  background: #f9f9f9;
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 40px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: #777;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    box-shadow: 0 0 8px rgba(0, 122, 255, 0.2);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #357AEB;
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  color: #555;
`;

const Icon = styled.span`
  font-size: 20px;
  color: #4CAF50;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Page = () => {
  const [form, setForm] = useState({
    name: '',
    certificateNo: '',
    year: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter(); // Use the router for navigation

  const validCredentials: Record<string, string> = {
    'CERT0001': 'PASS001',
    'CERT0002': 'PASS002',
    'CERT0003': 'PASS003',
    'CERT0004': 'PASS004',
    'CERT0005': 'PASS005',
    'CERT0006': 'PASS006',
    'CERT0007': 'PASS007',
    'CERT0008': 'PASS008',
    'CERT0009': 'PASS009',
    'CERT0010': 'PASS010',
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { certificateNo, year } = form;

    if (validCredentials[certificateNo] === year) {
     
      setIsLoggedIn(true);
      router.push('/sign-in'); 
    } else {
      alert('Invalid Certificate Number or Password.');
    }
  };

  return (
    <Container>
      <Card>
        <FormSection>
          <Title>Enter Your Details</Title>
          <Form onSubmit={handleSubmit}>
            <FormControl>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <Label>Certificate Number</Label>
              <Input
                type="text"
                name="certificateNo"
                value={form.certificateNo}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <Label>Password</Label>
              <Input
                type="password"
                name="year"
                value={form.year}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Button type="submit">
              {isLoggedIn ? 'Proceed to Sign-In' : 'Submit'}
            </Button>
          </Form>
        </FormSection>
        <InfoSection>
          <Image src="./Query.jpg" alt="Profile Image" />
          <ContactInfo>
            <InfoItem>
              <Icon>📍</Icon>
              Manglore
            </InfoItem>
            <InfoItem>
              <Icon>📞</Icon>
              +91 9686079760
            </InfoItem>
            <InfoItem>
              <Icon>✉️</Icon>
              nayakapoorva2003@gmail.com
            </InfoItem>
          </ContactInfo>
        </InfoSection>
      </Card>
    </Container>
  );
};

export default Page;

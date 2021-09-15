import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "../components/ContactForm";

const ContactUpdate = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState();

  const getContactInfo = useCallback(async () => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `http://localhost:3000/user`;
    const contactInstance = await axios({
      method: "GET",
      url,
    });

    const filterContactInfo = contactInstance.data.find(
      (contact) => contact.id === Number(id)
    );

    // 리스트에서 필터
    setContactInfo(filterContactInfo);

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    getContactInfo();
  }, [getContactInfo]);

  return !isLoading && <ContactForm contactInfo={contactInfo} />;
};

export default ContactUpdate;

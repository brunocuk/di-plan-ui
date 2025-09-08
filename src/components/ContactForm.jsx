import { useState } from "react";
import { useLocale } from "../config/localeContext";
import axios from "axios";
import constantsExport from "../config/constants";

const API_PATH = constantsExport.API_PATH;

export default function ContactForm() {
  const { locale } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    clientType: "Private",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post(
        `${API_PATH}/api/contact-forms`,
        {
          data: {
            ...formData,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 285ab22a012ecf792a1319568a798e10a921df737277b23187c402c61f8d6f30ff1965d960e89f744111c3a63297dc0eed90f92248eef3ef423266def071ee4f155d8eb26f016d3d38dbbccf84e92383dc6ab0c82afe2517be612e48109cb44f52a637c7ae20f5520ff93047a41aaa2dc9a23b6e6129236fa0a5dcb24002277e",
          },
        }
      );

      if (res.status === 201) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          clientType: "Private",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <p className="font-bold uppercase text-xs">Ime i prezime</p>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      />
      <p className="font-bold uppercase text-xs">Email</p>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      />
      <p className="font-bold uppercase text-xs">Broj Telefona</p>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Your phoneNumber number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      />
      <p className="font-bold uppercase text-xs">Tip Klijenta</p>
      <select
        name="clientType"
        value={formData.clientType}
        onChange={handleChange}
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      >
        <option value="Private">Private client</option>
        <option value="Company">Company</option>
      </select>
      <textarea
        name="message"
        placeholder="Your message"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg rounded-[16px] h-32 mb-8"
      ></textarea>
      <button
        type="submit"
        className="bg-cta-color text-white px-4 py-2 w-full rounded-[999px] h-[58px]"
      >
        Send
      </button>
      <p className="text-center">{status}</p>
    </form>
  );
}

// 4dd24f6dfd5b6a02a1b58a06a9596790dedf51ebe06dd7a54e1b8ba73e228fa0927e191fd6b158c90429428fd349ac97c9d4db67b34899dcb5cbfad9172bbc73963017f502aa4630f72e2495ba1318ac33c2efe43ebd61053bdf1e816ef3e3aba17f44a506ea5363f0a297dc301bbe20325edb799f0032194fa45b182b9aca3a

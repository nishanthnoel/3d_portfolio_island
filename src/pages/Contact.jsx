import React, { useState, useRef, Suspense } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Fox from "../models/Fox";
import Loader from "../components/Loader";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //   The moment you click submit, the <button> loses focus immediately, triggering handleBlur.

  // handleBlur sets currentAnimation to "idle"

  // Then setCurrentAnimation("hit") runs almost at the same time, but React batches updates and depending on timing, "idle" wins → fox looks like it never hit.

  // So the blur on the button/input is overriding your hit animation.
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");
    // console.log(
    //   import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    //   import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID
    // );
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "John Doe",
          from_email: form.email,
          to_email: "nishanthnoel14@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY //this is an async operation therefore we have to call .then on this
      )
      .then(() => {
        setLoading(false);
        showAlert({ text: "Message sent successfully!", type: "success" });
        setTimeout(() => {
          hideAlert();
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, 3000);
      })
      .catch((err) => {
        setLoading(false);
        setCurrentAnimation("idle");
        showAlert({
          show: true,
          text: "I didn't receive your message",
          type: "danger",
        });
        console.log(err);
        //TODO: show error message
      });
  };
  const handleFocus = (e) => {
    setCurrentAnimation("walk");
  };
  const handleBlur = (e) => {
    setCurrentAnimation((prev) => (prev === "hit" ? prev : "idle"));
  };

  return (
    <>
      <section className="relative flex lg:flex-row flex-col max-container">
        {alert.show && <Alert {...alert} />}
        {/* <Alert text = "test" /> */}
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text">Get in touch!</h1>
          <form
            className="w-full flex flex-col gap-7 mt-14"
            onSubmit={handleSubmit}
          >
            <label className=" text-black-500 font-semibold flex flex-col gap-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></input>
            <label className=" text-black-500 font-semibold flex flex-col gap-2">
              Email
              <input
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></input>
            </label>
            <label className=" text-black-500 font-semibold flex flex-col gap-2">
              Your Message
              <textarea
                rows={4}
                className="textarea"
                name="message"
                placeholder="Let me know how I can help you!"
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></textarea>
            </label>
            <button
              type="submit"
              className="btn"
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[330px]">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75, // fov controls how wide the camera can see vertically, measured in degrees.\
              near: 0.1,
              far: 1000,
            }}
          >
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.6, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </>
  );
};

export default Contact;

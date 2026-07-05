import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { KeyRound, Code2, ShieldCheck, Sparkles, MonitorSmartphone } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import AuthCard from "../../components/auth/AuthCard";
import CodeBlock from "../../components/common/CodeBlock";
import Footer from "../../components/common/Footer";
import CodeAccessModal from "../../components/common/CodeAccessModal";

const useCases = ["Protected dashboards", "User profiles", "E-commerce checkout", "Admin panels"];

const frontendCode = `// npm install axios @react-oauth/google

import React, { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const AuthForm = () => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const { data } = await axios.post(endpoint, form);
      localStorage.setItem("token", data.token); // store the JWT
      // 🔧 redirect to dashboard / save user in context or redux here
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
    }
  };

  // Google sign-in: get an access token from Google, then hand it to
  // OUR OWN backend so it can verify it and issue our own JWT.
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { data } = await axios.post("/api/auth/google", {
        token: tokenResponse.access_token,
      });
      localStorage.setItem("token", data.token);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {mode === "signup" && (
        <input name="name" placeholder="Full name" onChange={handleChange} />
      )}
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button type="submit">
        {mode === "login" ? "Log In" : "Create Account"}
      </button>

      <button type="button" onClick={() => handleGoogleLogin()}>
        Continue with Google
      </button>

      <p onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
      </p>
    </form>
  );
};

export default AuthForm;`;

const backendCode = `// npm install express mongoose bcryptjs jsonwebtoken google-auth-library

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User"); // mongoose: { name, email, password, googleId }

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// 📝 Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  res.json({ token: signToken(user._id) });
});

// 🔑 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ token: signToken(user._id) });
});

// 🔵 Google sign-in
router.post("/google", async (req, res) => {
  const { token } = req.body;

  // Confirm this access token really belongs to a Google account
  const ticket = await client.getTokenInfo(token);
  const { email } = ticket;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name: email.split("@")[0], email, googleId: true });
  }

  res.json({ token: signToken(user._id) });
});

module.exports = router;`;

const AuthPage = ({demo=false}) => {
  const isGray = useSelector((state) => state.user.isGray);
  const [unlocked, setUnlocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

    useEffect(()=>{
   window.scrollTo(0,0);
  },[]);
  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isGray ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar isGray={isGray} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <PageBreadcrumb isGray={isGray} current="Auth: Login & Signup" /> */}

        {/* header */}
 { demo &&  <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isGray
                  ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300"
                  : "bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-600"
              }`}
            >
              <KeyRound size={22} />
            </span>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${isGray ? "text-slate-50" : "text-slate-900"}`}>
                Auth: Login &amp; Signup
              </h1>
              <p className={`font-mono text-xs uppercase tracking-wider ${isGray ? "text-slate-500" : "text-slate-400"}`}>
                MERN · JWT · Google OAuth
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
              isGray
                ? "bg-gradient-to-r from-cyan-500 to-violet-600"
                : "bg-gradient-to-r from-indigo-600 to-fuchsia-600"
            }`}
          >
            <Code2 size={16} />
            {unlocked ? "Code Unlocked" : "Get Code"}
          </button>
        </div>}

        {/* definition */}
      {demo &&  <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-8 rounded-2xl border p-6 ${
            isGray ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
          }`}
        >
          <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <ShieldCheck size={15} />
            What is Authentication?
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${isGray ? "text-slate-300" : "text-slate-600"}`}>
            <strong>Authentication</strong> lets people create an account and prove who
            they are when they come back. A common pattern is <strong>JWT</strong>{" "}
            (JSON Web Token): after a successful login, the server signs a small token
            and sends it back — the browser stores it and attaches it to future
            requests instead of sending the password every time. <strong>Google
            sign-in</strong> skips the password entirely by letting Google vouch for
            the user's identity instead.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {useCases.map((u) => (
              <span
                key={u}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isGray ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                {u}
              </span>
            ))}
          </div>
        </motion.section>}

        {/* live demo */}
        <section className="mt-8">
         {demo &&  <h2 className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
            <MonitorSmartphone size={15} />
            Live Preview
          </h2>}
          <AuthCard isGray={isGray} />
          {demo && <p className={`mt-2 text-xs ${isGray ? "text-slate-500" : "text-slate-400"}`}>
            Fully interactive — switch between Log In / Sign Up, toggle password visibility, and submit. No real account is created.
          </p>}
        </section>

        {/* code */}
       {demo && <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${isGray ? "text-cyan-400" : "text-indigo-600"}`}>
              <Sparkles size={15} />
              Get the Code
            </h2>
            {unlocked && (
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
                ✓ Unlocked
              </span>
            )}
          </div>

          <CodeBlock
            isGray={isGray}
            locked={!unlocked}
            onUnlock={() => setModalOpen(true)}
            tabs={[
              { id: "frontend", label: "Frontend (React)", code: frontendCode },
              { id: "backend", label: "Backend (Express + MongoDB)", code: backendCode },
            ]}
          />
        </section>}
      </main>

      <Footer isGray={isGray} />

      <CodeAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isGray={isGray}
        featureName="Auth: Login & Signup"
        onSelectPlan={() => setUnlocked(true)}
      />
    </div>
  );
};

export default AuthPage;
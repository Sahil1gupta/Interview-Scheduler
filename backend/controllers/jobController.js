const Job = require('../models/Job');
const Company = require('../models/Company'); // Import the Company model
const nodemailer = require('nodemailer');

exports.createJob = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;

  // Ensure user is verified
  const company = await Company.findById(req.company.id);
  if (!company.isEmailVerified) return res.status(403).json({ msg: 'User not verified' });

  try {
    const job = new Job({ companyId: req.company.id, jobTitle, jobDescription, experienceLevel, candidates, endDate });
    await job.save();

    sendJobEmails(candidates, job);
    res.json({ msg: 'Job posted and emails sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Send job posting emails
const sendJobEmails = (candidates, job) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  candidates.forEach((email) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Job Posting: ${job.jobTitle}`,
      html: `<p>A new job has been posted: <strong>${job.jobTitle}</strong><br>Description: ${job.jobDescription}<br>Experience Level: ${job.experienceLevel}</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      else console.log(`Email sent: ${info.response}`);
    });
  });
};
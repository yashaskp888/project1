import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <div className="  max-w-2xl w-full p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center underline">About Give Me A Chai</h1>
      <p className="text-white text-lg mb-6 text-center">
        Give Me A Chai is a platform that helps creators, artists, and developers receive support from their fans and followers in the form of small donations—just like buying them a chai!
      </p>
      <ul className="list-disc list-inside text-white mb-6">
        <li>Simple and secure payment integration</li>
        <li>Customizable creator profiles</li>
        <li>Connect with your supporters</li>
        <li>Share your work and receive appreciation</li>
      </ul>
      <p className="text-white text-center">
        Whether you’re a developer, designer, writer, or artist, Give Me A Chai makes it easy for your community to show their love and support. Start sharing your profile and enjoy a chai from your fans!
      </p>
      <p className="text-white mb-6">
          Our mission is to help creators focus on what they love by providing a hassle-free way to receive appreciation and financial support. Whether you’re a developer, designer, writer, musician, or artist, Give Me A Chai is built for you.
        </p>
        <p className="text-white mb-6">
          <span className="font-semibold">How it works:</span> 
          <br />
          1. Sign up and create your profile.<br />
          2. Share your unique link with your audience.<br />
          3. Receive donations and messages from your supporters.<br />
          4. Withdraw your earnings securely.
        </p>
        <p className="text-white text-2xl text-center">
          Join our growing community of creators and start receiving your chai today! If you have any questions or feedback, feel free to reach out to us.
        </p>
    </div>
  </div>
);

  
}

export default About
export const metadata = {
  title: "Give-Me-A-Chai/About",
  description: "About Page",
};

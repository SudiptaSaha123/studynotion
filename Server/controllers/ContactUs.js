const { contactUsEmail } = require("../mail/templates/contactFormRes");
const { mailSender } = require("../utils/mailSender");

exports.contuctUsController = async (req, res) => {
  const { email, firstName, lastName, message, phoneNo, countryCode } =
    req.body;
  console.log(req.body);

  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNo, countryCode)
    );

    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error message :", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};

import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import RZPLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { resetCart } from "../../redux/slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  COURSE_FREE_ENROLL_API,
} = studentEndpoints;

// Load the Razorpay SDK from The CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

// Buy The course
export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your internet connection"
      );
      return;
    }

    // Initializing the order in backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;

    // Opening the rezorpay SDK
    const options = {
      key: razorpayKey,
      amount: `${orderResponse.data.data.amount}`,
      currency: orderResponse.data.data.currency,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      image: RZPLogo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed");
      console.log("Payment Error", response.error);
    });
  } catch (error) {
    toast.error("Could Not make Payment.");
  }

  toast.dismiss(toastId);
}

// Send Payment success email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    const res = await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error);
  }
}

// Verify the payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful. You Are Added To The Course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    toast.error("Could Not Verify Payment.");
  }

  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

// Free enrollment of student
export const freeEnrollStudent = async (token, courses, navigate) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      COURSE_FREE_ENROLL_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("You Are Enrolled To The Course");
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    toast.error("Could Not Enroll");
  }
  toast.dismiss(toastId);
};

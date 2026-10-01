import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RAZOR_PAY_TEST_KEY } from '../../config';
import { ToastContext } from '../../context/ToastProvider';
import { setFeatureAccess, setUserData } from '../redux/userSlice';
import api from '../utilities/axiosInstance';

const useHandleRazorpayPayment = ({ onClose }) => {
    const [loadingPlan, setLoadingPlan] = useState(null);
    const { setToast } = useContext(ToastContext);

    const { userData } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // display razorpay
    const handlePayment = async (plan) => {
        if (!userData) {
            navigate('/auth')
            return onClose();
        }
        try {
            const payload = {
                plan: plan.id,
                amount: plan.amount,
                featureId: plan.id === 'single' ? plan.featureId : 'pro',
            }

            setLoadingPlan(true);

            const response = await api.post("/subscription/create-order", payload)

            const order = response.data.order;

            console.log("Order of create order :", order);

            // Open Razorpay Checkout
            const options = {
                key: RAZOR_PAY_TEST_KEY, // Replace with your Razorpay key_id
                amount: order.amount, // Amount is in currency subunits.
                currency: order.currency,
                name: 'React All Features',
                description: 'Test Transaction',
                order_id: order.id, // This is the order_id created in the backend
                handler: async function (response) {
                    console.log("HANDLER FIRED");
                    console.log("Razorpay response:", response);

                    try {
                        const data = {
                            orderCreationId: order.id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            plan: order,
                        };
                        setLoadingPlan(true);
                        const result = await api.post(
                            "/subscription/verify-payment",
                            data
                        );

                        if (result.data.success) {
                            setToast({ type: "success", message: result.data.message || "Feature activated", position: "top-center" });
                            dispatch({ type: "user/setUserData", payload: result.data.user });
                            const userData = result.data.user;
                            if (userData.subscriptions?.length) {
                                const singleSubscription = userData.subscriptions.find((s) => s.plan === 'single');
                                const proPlan = userData.subscriptions.find((s) => s.plan === 'pro');
                                dispatch(setUserData({ ...userData, hasProAccess:proPlan ? true : false }));
                                if (singleSubscription && singleSubscription.features?.length) {
                                    singleSubscription.features.forEach((element) => {
                                        dispatch(setFeatureAccess(element.featureId))
                                    });
                                }


                            }
                            onClose();
                        }

                        console.log(result.data);
                    } catch (err) {
                        console.log("Verify error:", err);
                    } finally {
                        setLoadingPlan(false);
                    }
                },
                prefill: {
                    name: '<name>',
                    email: '<email>',
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
            };

            const rzp = new window.Razorpay(options);
            // 👇 add this — you're currently flying blind on errors
            rzp.on("payment.failed", function (response) {
                console.log("Payment failed:", response.error);
            });
            rzp.open();
        } catch (error) {
            console.log("handlePayment error :", error);
        } finally {
            setLoadingPlan(false);
        }
    }
    return {
        handlePayment,
        loadingPlan,
        setLoadingPlan
    }
}

export default useHandleRazorpayPayment
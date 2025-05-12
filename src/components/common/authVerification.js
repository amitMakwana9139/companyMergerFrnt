import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuthRedirect = ({ protectedRoute = false }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (protectedRoute && !token) {
            router.replace('/login');
        }

        if (!protectedRoute && token) {
            router.replace('/dashboard');
        }
    }, []);
};

export default useAuthRedirect;

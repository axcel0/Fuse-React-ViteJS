import { useLocation } from 'react-router-dom';

function usePathname() {
	const { pathname } = useLocation();

	return pathname;
}

export default usePathname;

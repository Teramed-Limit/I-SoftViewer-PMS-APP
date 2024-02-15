import './index.css';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './App';
import { registerFont } from './fonts';
import { fetchAppConfig } from './utils/api/api';

fetchAppConfig().then(() => {
	registerFont();
	ReactDOM.createRoot(document.getElementById('root')!).render(
		// <React.StrictMode>
		// 	<App />
		// </React.StrictMode>,
		<RecoilRoot>
			<App />
		</RecoilRoot>,
	);
});

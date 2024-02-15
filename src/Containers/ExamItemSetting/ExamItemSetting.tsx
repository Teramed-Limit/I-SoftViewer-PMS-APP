import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';

import GridTableEditor from '../../Components/GridTableEditor/GridTableEditor';
import { define, gridDefine } from '../../constant/setting-define';
import useHttpRequest from '../../hooks/useHttpRequest';
import { ExamItemEntity } from '../../interface/exam-item.ts';
import { atomSite } from '../../recoil/atoms/site.ts';

function ExamItemSetting() {
	const site = useRecoilValue(atomSite);
	const [examItems, setExamItems] = useState<ExamItemEntity[]>([]);
	const { sendRequest } = useHttpRequest<ExamItemEntity[]>(); // 指定泛型參數為預期的響應類型

	useEffect(() => {
		sendRequest({
			url: `/examItem/query?filter=siteId=${site.siteId}`, // API路徑
			method: 'get', // 請求方法
			onSuccess: (data) => {
				setExamItems(data);
			},
			showNotification: false,
		});
	}, [sendRequest, site.siteId]);

	return (
		<Stack spacing={2} direction="column" sx={{ width: '100%', overflow: 'hidden' }}>
			<Stack
				sx={{ width: '100%', flex: 1, overflow: 'auto', position: 'relative' }}
				spacing={1}
				direction="column"
			>
				<GridTableEditor<ExamItemEntity>
					apiPath="examItem"
					initFormData={{
						itemId: 'TST',
						itemName: '',
						number: 1,
						modality: '',
						price: 1000,
						siteId: site.siteId,
					}}
					identityId="itemId"
					columnDefs={gridDefine.examItem.colDef}
					formDef={define.examItem}
					rowData={examItems}
					rowSelection="single"
				/>
			</Stack>
		</Stack>
	);
}

export default ExamItemSetting;

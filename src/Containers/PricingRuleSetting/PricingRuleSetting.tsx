import React, { useEffect, useState } from 'react';

import { ListItemButton, ListSubheader, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import GridTableEditor from '../../Components/GridTableEditor/GridTableEditor';
import { define, gridDefine } from '../../constant/setting-define';
import useHttpRequest from '../../hooks/useHttpRequest';
import { CodeList } from '../../interface/code-list.ts';
import { PricingRuleData, PricingRuleMap } from '../../interface/pricing-rule.ts';
import { generateUUID } from '../../utils/general.ts';

function PricingRuleSetting() {
	// const { open, setOpen, onModalClose } = useModal({});
	const { sendRequest } = useHttpRequest<PricingRuleMap>();
	const { sendRequest: sendAccountRequest } = useHttpRequest<CodeList[]>();
	const [selectUserId, setSelectUserId] = useState<string>('');
	const [rowData, setRowData] = useState<PricingRuleMap>({});
	const [userIdList, setUserIdList] = useState<CodeList[]>([]);

	// 取得PricingRuleEntity
	useEffect(() => {
		sendRequest({
			url: '/pricingRule/all', // API路徑
			method: 'get', // 請求方法
			onSuccess: (data) => {
				setRowData(data);
				setSelectUserId(Object.keys(data)[0] || '');
			},
			onError: () => {},
			showNotification: false,
		});
	}, [sendRequest]);

	useEffect(() => {
		sendAccountRequest({
			url: '/account/codeList?joinText=Title^DoctorEName',
			method: 'get',
			onSuccess: (data) => {
				setUserIdList(data);
			},
			showNotification: false,
		});
	}, [sendAccountRequest]);

	const onSetSelectCodeName = (userId: string) => {
		setSelectUserId(userId);
	};

	return (
		<Stack spacing={2} direction="row" sx={{ width: '100%', overflow: 'hidden' }}>
			<Stack sx={{ minWidth: '250px', overflow: 'auto' }} spacing={1} direction="column">
				<List
					sx={{ width: '100%', maxWidth: 360 }}
					component="nav"
					subheader={
						<ListSubheader
							sx={{
								height: '40px',
								display: 'flex',
								fontSize: '20px',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								bgcolor: '#F9F9F9',
							}}
							component="div"
						>
							<div>User</div>
						</ListSubheader>
					}
				>
					{userIdList.map((user) => {
						return (
							<React.Fragment key={user.value}>
								<ListItem sx={{ padding: 0 }}>
									<ListItemButton onClick={() => onSetSelectCodeName(user.value)}>
										<ListItemText primary={user.label} />
									</ListItemButton>
								</ListItem>
								<Divider component="li" />
							</React.Fragment>
						);
					})}
				</List>
			</Stack>
			<Stack sx={{ width: '100%', overflow: 'auto', position: 'relative' }} spacing={1} direction="column">
				<GridTableEditor<PricingRuleData>
					apiPath="pricingRule"
					identityId="ruleId"
					columnDefs={gridDefine.pricingRule.colDef}
					formDef={define.pricingRule}
					rowData={rowData[selectUserId] || []}
					initFormData={{
						ruleId: generateUUID(),
						item: 'Reporting',
						byType: 'Job',
						examItemId: '',
						examItemName: '',
						value: 15,
						userID: selectUserId,
						userName: 'selectUserId',
						isCommonPrice: false,
					}}
				/>
			</Stack>
		</Stack>
	);
}

export default PricingRuleSetting;

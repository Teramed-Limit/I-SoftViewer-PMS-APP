import React, { useCallback, useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemButton, ListSubheader, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import CustomModal from '../../Components/CustomModal/CustomModal.tsx';
import GridTableEditor from '../../Components/GridTableEditor/GridTableEditor';
import { define, gridDefine } from '../../constant/setting-define';
import useHttpRequest from '../../hooks/useHttpRequest';
import { useModal } from '../../hooks/useModal.ts';
import { CodeList, CodeListMap } from '../../interface/code-list';
import { http } from '../../utils/api/api.ts';

function CodeListSetting() {
	const { open, setOpen, onModalClose } = useModal({});
	// State
	const [codeListMap, setCodeListMap] = useState<CodeListMap>({});
	const [selectCodeName, setSelectCodeName] = useState<string>('');
	const [selectCodeList, setSelectCodeList] = useState<CodeList[]>([]);
	const [addCodeName, setAddCodeName] = useState<string>('');

	const { sendRequest } = useHttpRequest<CodeListMap>(); // 指定泛型參數為預期的響應類型

	const fetchCodeList = useCallback((codeName: string) => {
		const subscription = http.get<CodeListMap>('/codeList/all').subscribe((data: CodeListMap) => {
			setCodeListMap(data);
			setSelectCodeName(codeName);
			if (!data[codeName]) {
				setSelectCodeList(Object.values(data)[0]);
				return;
			}
			setSelectCodeList(data[codeName]);
		});
		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const subscription = http.get<CodeListMap>('/codeList/all').subscribe((data: CodeListMap) => {
			setCodeListMap(data);
			setSelectCodeName(Object.keys(data)[0]);
			setSelectCodeList(Object.values(data)[0]);
		});
		return () => subscription.unsubscribe();
	}, []);

	const getExcludeCodeListMap = (excludeList?: string[]) => {
		if (excludeList) {
			const result = {};
			// 根據excludeList過濾codeListMap
			Object.keys(codeListMap).forEach((key) => {
				if (!excludeList.includes(key)) {
					result[key] = codeListMap[key];
				}
			});
			return result;
		}
		return codeListMap;
	};

	const onSetSelectCodeName = (codeName: string) => {
		setSelectCodeName(codeName);
		setSelectCodeList(codeListMap[codeName]);
	};

	const onAddCodeListCategory = () => {
		sendRequest({
			url: '/codeList', // API路徑
			method: 'post', // 請求方法
			body: {
				label: 'Option1',
				value: 'Option1',
				codeName: addCodeName,
				parentCodeValue: '',
				orderingIndex: 1,
			} as CodeList,
			onSuccess: () => {
				setAddCodeName(addCodeName);
				setOpen(false);
				fetchCodeList(addCodeName);
			},
		});
	};

	const onDeleteCodeListByCodeName = (codeName: string) => {
		sendRequest({
			url: `/codeList/codeName/${codeName}`, // API路徑
			method: 'del', // 請求方法
			onSuccess: () => {
				fetchCodeList('');
			},
		});
	};

	return (
		<Stack spacing={2} direction="row" sx={{ width: '100%', overflow: 'hidden' }}>
			<CustomModal width="20%" label="Add Code Name" open={open} onModalClose={() => onModalClose()}>
				<Stack spacing={1}>
					<Box>
						<TextField
							fullWidth
							label="Category"
							variant="outlined"
							value={addCodeName}
							onChange={(e) => {
								setAddCodeName(e.target.value);
							}}
						/>
					</Box>
					<Stack direction="row" spacing={1} justifyContent="end">
						<Button variant="contained" onClick={() => onAddCodeListCategory()}>
							Add
						</Button>
					</Stack>
				</Stack>
			</CustomModal>
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
							<div>Code Name</div>
							<IconButton onClick={() => setOpen(true)}>
								<AddCircleIcon />
							</IconButton>
						</ListSubheader>
					}
				>
					{Object.entries(getExcludeCodeListMap(['UserAccount'])).map(([codeName]) => {
						return (
							<React.Fragment key={codeName}>
								<ListItem
									secondaryAction={
										<IconButton edge="end" onClick={() => onDeleteCodeListByCodeName(codeName)}>
											<DeleteIcon color="error" />
										</IconButton>
									}
									disablePadding
								>
									<ListItemButton onClick={() => onSetSelectCodeName(codeName)}>
										<ListItemText primary={codeName} />
									</ListItemButton>
								</ListItem>
								<Divider component="li" />
							</React.Fragment>
						);
					})}
				</List>
			</Stack>
			<Stack sx={{ width: '100%', overflow: 'auto', position: 'relative' }} spacing={1} direction="column">
				<GridTableEditor
					apiPath="codeList"
					identityId="id"
					columnDefs={gridDefine.codeList.colDef}
					formDef={define.codeList}
					rowData={selectCodeList}
					initFormData={
						{
							label: '',
							value: '',
							codeName: selectCodeName,
							parentCodeValue: '',
							orderingIndex: 0,
						} as CodeList
					}
					rowSelection="multiple"
					deleteCallBack={() => fetchCodeList(selectCodeName)}
					addCallBack={() => fetchCodeList(selectCodeName)}
					updateCallBack={() => fetchCodeList(selectCodeName)}
				/>
			</Stack>
		</Stack>
	);
}

export default CodeListSetting;

import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as R from 'ramda';
import { FileUploader } from 'react-drag-drop-files';

import { useModal } from '../../hooks/useModal.ts';
import CustomModal from '../CustomModal/CustomModal.tsx';
import classes from './ImageDragAndDrop.module.scss';

interface Props {
	label?: string;
	value: string[] | File[];
	onChange: (file: File[] | string[]) => void;
}

function ImageDragAndDrop({ label, value, onChange }: Props) {
	const fileTypes = ['JPG', 'JPEG', 'PNG', 'GIF']; // 支持的檔案類型
	const [uploadedImages, setUploadedImages] = useState<string[]>([]); // 已上傳的圖片 URL
	const [selectedImage, setSelectedImage] = useState<string>(''); // 選擇顯示的圖片

	const { open, setOpen, onModalClose } = useModal({});

	// 當 value 變化時，將檔案轉換為 URL 或直接使用 URL
	useEffect(() => {
		if (!value) return setUploadedImages([]);

		const promises: Promise<string>[] = value.map((file: string | File) => {
			if (typeof file === 'string') return Promise.resolve(file); // 如果是 URL，直接返回
			return new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target && e.target.result) {
						resolve(e.target.result as string);
					} else {
						reject(new Error('Failed to read file.'));
					}
				};
				reader.readAsDataURL(file); // 讀取檔案為 Data URL
			});
		});

		Promise.all(promises)
			.then((results) => {
				setUploadedImages(results); // 設定已上傳的圖片 URL
			})
			.catch((error) => {
				console.error('Error reading files:', error);
			});
	}, [value]);

	// 處理刪除圖片的邏輯
	const handleDelete = (index: number) => {
		setUploadedImages((prev) => prev.filter((_, i) => i !== index)); // 移除選定的圖片
		const oldFiles = value.filter((_, i) => i !== index); // 移除對應的檔案
		onChange(oldFiles as string[] | File[]); // 更新外部狀態
	};

	return (
		<Stack flex="1 1 auto" spacing={1}>
			<FileUploader
				multiple
				name="file"
				label={label}
				handleChange={(files: FileList) => {
					const newFiles = Array.from(files);
					const concatFiles = R.concat(value as any, newFiles); // 合併新舊檔案
					onChange(concatFiles as any); // 合併新舊檔案並更新
				}}
				types={fileTypes}
			/>
			<CustomModal open={open} onModalClose={onModalClose}>
				<Stack className={classes.container}>
					<img className={classes.responsiveImg} src={selectedImage} alt="Uploaded" />
				</Stack>
			</CustomModal>
			{uploadedImages.length ? (
				<Stack direction="row" flexWrap="wrap">
					{uploadedImages.map((image, index) => {
						return (
							<Box key={image} sx={{ position: 'relative', ml: 1 }}>
								<img
									style={{ maxHeight: '100px', cursor: 'pointer' }}
									src={image}
									alt="Uploaded"
									onClick={() => {
										setSelectedImage(image);
										setOpen(true);
									}}
								/>
								<div className={classes.floatWrapperTopRight}>
									<IconButton onClick={() => handleDelete(index)}>
										<DeleteIcon color="error" />
									</IconButton>
								</div>
							</Box>
						);
					})}
				</Stack>
			) : (
				<></>
			)}
		</Stack>
	);
}

export default ImageDragAndDrop;

export interface Payment {
	calculatePaymentType: string; // 報酬計算類型
	calculateValue: number; // 報酬計算值
	itemId: string; // 項目ID
	itemName: string; // 項目名稱
	numberOfItemJobs: number; // 此項目總工作數量
	numberOfItem: number; // 此項目做了多少次
	price: number; // 價格
	payment: number; // 報酬金額
}

export interface PaymentReport {
	reportingPayments: Payment[]; // 報告支付
	scanningPayments: Payment[]; // 掃描支付
}

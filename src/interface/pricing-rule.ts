export interface PricingRuleEntity {
	ruleId: string; // 規則ID
	item: string; // 項目
	byType: string; // 類型
	examItemId: string | null; // 檢查項目ID
	value: number; // 值
	userID: string; // 使用者ID
	isCommonPrice: boolean; // 使用者ID
}

export interface PricingRuleData {
	ruleId: string; // 規則ID
	item: string; // 項目
	byType: string; // 類型
	examItemId: string | null; // 檢查項目ID
	examItemName: string | null; // 檢查項目
	value: number; // 值
	userID: string; // 使用者ID
	userName: string; // 使用者名稱
	isCommonPrice: boolean; // 使用者ID
}

export interface PricingRuleMap {
	[props: string]: PricingRuleData[];
}

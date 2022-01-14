import { post, get } from "@/utils/request";
/**
 * 查询认证列表
 * @param {*} params 
 * @returns 
 */
export async function queryAuthList (params) {
    try {
        let { code, data, msg } = await get(`/evidence/authority/query`, {
            ...params
        });
        if (code == 0) {
            return data;
        } else {
            this.$message.error(msg);
        }
    } catch (error) {
        console.log(error);
    }
}
/**
 * 审核
 * @param {*} params 
 * @returns 
 */
export async function verify (params) {
    try {
        let fromData = new FormData();
        params &&
            Object.keys(params).forEach((key) => {
                fromData.append(key, params[key]);
            });
        let { code, data, msg } = await post(`/evidence/authority/verify`, fromData, {
            "Content-Type": "application/x-www-form-urlencoded",
        });
        if (code == 0) {
            return data;
        } else {
            this.$message.error(msg);
        }
    } catch (error) {
        console.log(error);
    }
}

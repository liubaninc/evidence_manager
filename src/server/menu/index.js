import { post, get } from "@/utils/request";
/**
 * 添加套餐
 * @param {*} params 
 * @returns 
 */
export async function addMenu (params) {
  try {
    let fromData = new FormData();
    params &&
      Object.keys(params).forEach((key) => {
        fromData.append(key, params[key]);
      });
    let { code, data, msg } = await post(`/evidence/pay_pack/add`, fromData, {
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
/**
 * 更新套餐信息
 * @param {*} params 
 * @returns 
 */
export async function updateMenu (params) {
  try {
    let fromData = new FormData();
    params &&
      Object.keys(params).forEach((key) => {
        fromData.append(key, params[key]);
      });
    let { code, data, msg } = await post(`/evidence/pay_pack/update`, fromData, {
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
/**
 * 查询套餐信息
 * @param {*} params
 * @returns
 */
export async function queryMenuList (params) {
  try {
    let { data, code, msg } = await get("/evidence/pay_pack/query", {
      currentPage: 1,
      rowCount: 10000,
      ...params,
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
 * 查询套餐信息
 * @param {*} params
 * @returns
 */
export async function queryMenuById (params) {
  try {
    let { data, code, msg } = await get(
      "/evidence/pay_pack/getPaymentPackageById",
      {
        ...params,
      }
    );
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
 * 删除套餐
 * @param {*} params 
 * @returns 
 */
export async function delMenu (params) {
  try {
    let fromData = new FormData();
    params &&
      Object.keys(params).forEach((key) => {
        fromData.append(key, params[key]);
      });
    let { code, data, msg } = await post(`/evidence/pay_pack/delete`, fromData, {
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
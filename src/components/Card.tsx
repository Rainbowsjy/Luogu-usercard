import React from "react";
import { UserInfo } from "./type";
import $ from "jquery";

const defaultBackgroundURL = "https://cdn.luogu.org/images/bg/fe/DSCF0530-shrink.jpg";

const getInfo = (id: number): UserInfo => {
  let ans: UserInfo;
  $.ajax({
    async: false,
    type: "GET",
    url: `https://www.luogu.com.cn/user/${id}`,
    headers: { "x-luogu-type": "content-only" },
    success: (res) => { ans = res.currentData.user; }
  });
  return ans;
};

const FailedCard = () => {
  return (
    <div style={{width: 300, borderRadius: 5, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 0 5px 1px #999", background: "#fff", fontWeight: "bold", textAlign: "center"}}>
      <h2 style={{marginTop: 20}}>加载卡片失败了哦……</h2>
      <h5>试着检查下网络？</h5>
    </div>
  );
};

const InfoCard = (props: { info: UserInfo }) => {
  const userInfo = props.info;
  return (
    <div style={{width: 300, borderRadius: 5, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 0 5px 1px #999", background: "#fff", fontWeight: "bold", textAlign: "center"}}>
      <div style={{width: "100%", height: 60, background: `url(${userInfo.background}) no-repeat`, backgroundSize: `cover`}}></div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", flexDirection: "row", width: "100%", position: "relative", height: 52}}>
          <div style={{width: 80}}>
          <div style={{backgroundColor: "#fff", boxShadow: "0 0 5px 1px #999", background: `url(https://cdn.luogu.com.cn/upload/usericon/${userInfo.uid}.png) no-repeat`, backgroundSize: `cover`, width: 60, height: 60, borderRadius: 30, position: "absolute", top: -16, left: 10}} />
          </div>
          <div style={{flex: 1}}>
            <div className={("lg-fg-" + userInfo.color.toLowerCase())} style={{fontWeight: "bold", fontSize: 18}}>
              {userInfo.name}
              {userInfo.badge !== "" && <span className={("am-badge am-radius lg-bg-" + userInfo.color.toLowerCase())} style={{marginLeft: 5}}>{userInfo.badge}</span>}
            </div>
            <div style={{color: "grey", fontSize: 16}}>#{userInfo.uid}</div>
          </div>
        </div>
        <div style={{fontSize: 14, margin: "0px 15px", fontWeight: "normal"}}>{userInfo.slogan}</div>
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>关注</div>
            <div style={{textAlign: "center", fontSize: 16}}>{userInfo.followingCount}</div>
          </div>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>粉丝</div>
            <div style={{textAlign: "center", fontSize: 16}}>{userInfo.followerCount}</div>
          </div>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>通过题数</div>
            <div style={{textAlign: "center", fontSize: 16}}>{userInfo.passedProblemCount}</div>
          </div>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>咕值排名</div>
            <div style={{textAlign: "center", fontSize: 16}}>{userInfo.ranking == null ? "-" : String(userInfo.ranking)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card = (props: { id: number }) => {
  let getInfoOK = true;
  const dt = getInfo(props.id);
  if (dt === undefined) {
    console.error(`Get user ${props.id} info failed!`);
    getInfoOK = false;
  } else {
    if (dt.background === "")
      dt.background = defaultBackgroundURL;
  }
  return getInfoOK ? <InfoCard info={dt} /> : <FailedCard />;
};

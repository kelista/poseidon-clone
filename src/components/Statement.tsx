import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WSContext } from "../../routes/wsContext";
import { DateUtil } from "../services/dateUtil";
import moment from "moment";

const infoEvent = "info";

export const StatementInfo = () => {
  const wsClient = useContext(WSContext);
  const [modalReport, setModalReport] = useState(true);
  // 0 untuk this week
  // -1 untuk last week
  const [weekTab, setWeekTab] = useState<0 | -1>(0);

  const [report, setReport] = useState<any>();
  const [username, setUsername] = useState("");
  const [balancePlayer, setBalancePlayer] = useState(0);
  const [idPlayer, setIdPlayer] = useState("");

  const separatorBalance = (chip: number) => {
    return chip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const thisWeek = () => {
    setWeekTab(0);
    setModalReport(true);
  };

  const lastWeek = () => {
    setModalReport(false);
    setWeekTab(-1);
  };
  const lobbyEvent = "lobby/statement";

  useEffect(
    function cb() {
      if (!wsClient) return;
      const listeners: string[] = [];

      const lobbyAction = async function (data: any) {
        console.log(data);
        setReport(data);
      };

      const infoAction = async function (data: any) {
        setUsername(data.username);
        setBalancePlayer(data.balance);
        setIdPlayer(data.meb_id);
      };

      const lobbyListener = wsClient.addListener(lobbyEvent, lobbyAction);
      listeners.push(lobbyListener);

      const infoListener = wsClient.addListener(infoEvent, infoAction);
      listeners.push(infoListener);

      return () => {
        listeners.map((lst) => {
          wsClient?.removeListener(lst);
        });
      };
    },
    [wsClient ? true : false]
  );

  useEffect(
    function gameInit() {
      wsClient?.sendMessage(lobbyEvent, { week: weekTab });
      updateInfo()
    },
    [weekTab]
  );

  const updateInfo = () => {
    wsClient?.sendMessage(infoEvent, {});
  }

  return (
    <View style={styles.statementContainer}>
      <View style={styles.statementWrapper}>
        <View style={styles.statementProfile}>
          <Image
            source={require("../assets/images/others/Sample.png")}
            style={styles.statementProfileImage}
          />
        </View>
        <View style={styles.statementProfileDetail}>
          <Text style={styles.statementProfileTitle}>Poseidon Club</Text>
          <Text style={styles.statementProfileName}>{username}</Text>
          <Text style={styles.statementProfileId}>ID: {idPlayer}</Text>
          <TouchableOpacity style={styles.statementUserBalance} onPress={updateInfo}>
            <Image
              source={require("../assets/images/others/balance-image.png")}
            />
            <Text style={styles.statementUserBalanceText}>{separatorBalance(balancePlayer)}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.statementBody}>
        <View style={styles.statementBoxContainer}>
          <View style={styles.statementBoxWrapper}>
            <TouchableOpacity
              style={styles.statementBoxContent}
              onPress={thisWeek}
            >
              <LinearGradient
                colors={[modalReport ? "#3C0000" : "#6E0000", "#400000"]}
                style={styles.statementBoxContentGradient}
              >
                <Text style={styles.statementBoxContentTitleText}>
                  This Week
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statementBoxContent}
              onPress={lastWeek}
            >
              <LinearGradient
                colors={[modalReport ? "#6E0000" : "#3C0000", "#400000"]}
                style={styles.statementBoxContentGradient}
              >
                <Text style={styles.statementBoxContentTitleText}>
                  Last Week
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {report ? (
            DateUtil.fillMissingStatement(report.statements).map(
              (d: any, index: number) => {
                return (
                  <View style={styles.statementBoxWrapper} key={index}>
                    <View style={styles.statementBoxContentBalance}>
                      <Text style={styles.statementBoxContentWeekText}>
                        {moment(d.date).format("DD.MM.yy")}
                      </Text>
                    </View>
                    <View style={styles.statementBoxContentBalance}>
                      <Text
                        style={
                          d.amount < 0
                            ? styles.statementBoxContentValueTextRed
                            : d.amount > 0
                            ? styles.statementBoxContentValueTextGreen
                            : styles.statementBoxContentValueText
                        }
                      >
                        {d.amount > 0
                          ? "+" + d.amount
                          : d.amount < 0
                          ? d.amount
                          : "-"}
                      </Text>
                    </View>
                  </View>
                );
              }
            )
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statementContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1000,
    paddingTop: 29,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  statementWrapper: {
    flexDirection: "row",
    // backgroundColor: 'yellow',
    paddingLeft: 18,
  },
  statementProfile: {
    width: "39.5%",
    height: 125,
  },
  statementProfileDetail: {
    position: "relative",
    width: "60%",
    height: 125,
    paddingLeft: 20,
  },
  statementProfileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    color: "#FAE087",
  },
  statementProfileName: {
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: 20,
    color: "#FFFFFF",
    paddingTop: 9,
  },
  statementProfileId: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 14,
    color: "#FFFFFF",
    paddingTop: 13,
  },
  statementProfileImage: {
    width: 123,
    height: 123,
    borderRadius: 102,
  },
  statementUserBalance: {
    position: "relative",
    marginTop: 13,
    width: 134,
  },
  statementUserBalanceText: {
    fontSize: 16,
    color: "#FFFFFF",
    right: 8,
    top: 1,
    position: "absolute",
    paddingTop: Platform.OS == "ios" ? 2 : 0,
  },
  statementBody: {
    marginTop: 20,
  },
  statementBoxContainer: {
    flexDirection: "column",
    width: "100%",
    height: 64,
    marginTop: 18.5,
  },
  statementBoxWrapper: {
    flexDirection: "row",
    width: "100%",
  },
  statementBoxContent: {
    flex: 0.5,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  statementBoxContentGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  statementBoxContentBalance: {
    flex: 0.5,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
  },
  statementBoxContentBalanceLast: {
    flex: 0.5,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
  },
  statementBoxContentTitleText: {
    fontSize: 10,
    lineHeight: 11,
    fontWeight: "700",
    color: "#FAE087",
  },
  statementBoxContentWeekText: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "700",
    color: "#E6E6E6",
  },
  statementBoxContentValueText: {
    fontSize: 12,
    lineHeight: 14,
    color: "#FFFFFF",
  },
  statementBoxContentValueTextGreen: {
    fontSize: 12,
    lineHeight: 14,
    color: "#00F930",
  },
  statementBoxContentValueTextRed: {
    fontSize: 12,
    lineHeight: 14,
    color: "#F03939",
  },
  separatorRight: {
    marginLeft: 0.5,
  },
  separatorLeft: {
    marginRight: 0.5,
  },
});

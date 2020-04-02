<template>
  <div>
    <div id="myCalendar" class="myCalendar" style="width: 750px;height: 200px;"></div>
    <commit-list :commitList="commits"></commit-list>
  </div>
</template>

<script>
import util from "./../utils";
import CommitList from "./CommitList";
import echarts from "echarts";
import { mapGetters } from "vuex";
export default {
  name: "MyClendar",
  components: {
    CommitList
  },
  data() {
    return {
      myDate: {},
      rangeArr: [],
      dateCommit: []
    };
  },
  computed: {
    ...mapGetters(["commits"])
  },
  props: {
    id: String
  },
  mounted() {
    this.getCommitList();
  },
  methods: {
    getCommitList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store.dispatch("getCommitList", this.id).then(() => {
        this.myOptions();
        loading.close();
      });
    },
    toMapCount() {
      let dateMap = new Map();
      this.commits.forEach(item => {
        let date = util.formatTime(item.commitDate);
        let count = dateMap.get(date);
        dateMap.set(date, count == null || count == undefined ? 1 : count + 1);
      });
      console.log(dateMap);
      this.myDate = dateMap;
    },
    getVirtualMap() {
      let endDate = +echarts.number.parseDate(util.formatTime(new Date()));
      let startDate = +echarts.number.parseDate(
        endDate - 3600 * 24 * 1000 * 365
      );
      this.rangeArr.push(endDate, startDate);
      let dayTime = 3600 * 24 * 1000;
      for (let time = startDate; time <= endDate; time += dayTime) {
        let day = util.formatTime(time);
        let dayCommit = [];
        dayCommit.push(day);
        this.myDate.has(day)
          ? dayCommit.push(this.myDate.get(day))
          : dayCommit.push(0);
        this.dateCommit.push(dayCommit);
      }
    },
    myOptions() {
      this.toMapCount();
      this.getVirtualMap();
      let myCalendar = echarts.init(document.getElementById("myCalendar"));
      let rangeArr = this.rangeArr;
      let dateCommit = this.dateCommit;
      console.log(dateCommit);
      let option = {
        title: {
          top: 0,
          text: "提交记录",
          left: "center",
          textStyle: {
            color: "#3C4858"
          }
        },
        tooltip: {
          padding: 10,
          backgroundColor: "#555",
          borderColor: "#777",
          borderWidth: 1,
          formatter: function(obj) {
            var value = obj.value;
            return (
              '<div style="font-size: 14px;">' +
              value[0] +
              "：" +
              value[1] +
              "</div>"
            );
          }
        },
        visualMap: {
          show: true,
          showLabel: true,
          categories: [0, 1, 2, 3, 4],
          calculable: true,
          inRange: {
            symbol: "rect",
            color: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"]
          },
          itemWidth: 12,
          itemHeight: 12,
          orient: "horizontal",
          left: "520",
          bottom: 0
        },
        calendar: [
          {
            left: "center",
            range: rangeArr,
            cellSize: [13, 13],
            splitLine: {
              show: false
            },
            itemStyle: {
              color: "#196127",
              borderColor: "#fff",
              borderWidth: 2
            },
            yearLabel: {
              show: false
            },
            monthLabel: {
              nameMap: "cn",
              fontSize: 11
            },
            dayLabel: {
              formatter: "{start}  1st",
              firstDay: 1,
              nameMap: "cn",
              fontSize: 11
            }
          }
        ],
        series: [
          {
            type: "heatmap",
            coordinateSystem: "calendar",
            calendarIndex: 0,
            data: dateCommit
          }
        ]
      };
      myCalendar.setOption(option);
    }
  }
};
</script>

<style>
</style>
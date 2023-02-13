(function ($) {

    var sum = [];

    setData()

    $(document).ready(function () {
        var ctx = document.getElementById("myChart").getContext("2d");
                  var mixedChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                      labels: [
                        "22/08/01",
                        "22/09/01",
                        "22/10/01",
                      ],
                      datasets: [
        //                {
        //                  label: "INDEPENDENT_TOUR",
        //                  data: [1016077, 1099375, 917833, 1147083, 1161250, 1188756, 1227670],
        //                  type: "line",
        //                  backgroundColor: "transparent",
        //                  borderColor: "#007bff",
        //                  borderWidth: 3,
        //                  pointRadius: 5,
        //                  pointBackgroundColor: "#007bff",
        //                  pointBorderColor: "#007bff",
        //                  pointHoverRadius: 5,
        //                  pointHoverBackgroundColor: "#007bff",
        //                  pointHoverBorderColor: "#007bff",
        //                  pointHitRadius: 10
        //                },
                        {
                          label: "SUM",
                          data: sum,
                          backgroundColor: "#28a745",
                          borderColor: "#28a745",
                          borderWidth: 1
                        },
        //                {
        //                  label: "PACKAGE_TOUR",
        //                  data: [93059, 126194, 81464, 76722, 33274, 39229, 34177],
        //                  backgroundColor: "#ffc107",
        //                  borderColor: "#ffc107",
        //                  borderWidth: 1
        //                },
        //                {
        //                  label: "LEISURE_SPORTS",
        //                  data: [87837, 107477, 105463, 78134, 93984, 106281, 94892],
        //                  backgroundColor: "#dc3545",
        //                  borderColor: "#dc3545",
        //                  borderWidth: 1
        //                },
        //                {
        //                  label: "BUSINESS",
        //                  data: [96450, 125821, 132072, 107508, 127469, 81591, 127819],
        //                  backgroundColor: "#6c757d",
        //                  borderColor: "#6c757d",
        //                  borderWidth: 1
        //                },
        //                {
        //                  label: "RELAXATION",
        //                  data: [815262, 879740, 695645, 965567, 940925, 970029, 918511],
        //                  backgroundColor: "#17a2b8",
        //                  borderColor: "#17a2b8",
        //                  borderWidth: 1
        //                }
                    ]
                }
            })


    });


    var ctx = document.getElementById("myChart").getContext("2d");
          var mixedChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: [
                "22/08/01",
                "22/09/01",
                "22/10/01",
              ],
              datasets: [
//                {
//                  label: "INDEPENDENT_TOUR",
//                  data: [1016077, 1099375, 917833, 1147083, 1161250, 1188756, 1227670],
//                  type: "line",
//                  backgroundColor: "transparent",
//                  borderColor: "#007bff",
//                  borderWidth: 3,
//                  pointRadius: 5,
//                  pointBackgroundColor: "#007bff",
//                  pointBorderColor: "#007bff",
//                  pointHoverRadius: 5,
//                  pointHoverBackgroundColor: "#007bff",
//                  pointHoverBorderColor: "#007bff",
//                  pointHitRadius: 10
//                },
                {
                  label: "SUM",
                  data: sum,
                  backgroundColor: "#28a745",
                  borderColor: "#28a745",
                  borderWidth: 1
                },
//                {
//                  label: "PACKAGE_TOUR",
//                  data: [93059, 126194, 81464, 76722, 33274, 39229, 34177],
//                  backgroundColor: "#ffc107",
//                  borderColor: "#ffc107",
//                  borderWidth: 1
//                },
//                {
//                  label: "LEISURE_SPORTS",
//                  data: [87837, 107477, 105463, 78134, 93984, 106281, 94892],
//                  backgroundColor: "#dc3545",
//                  borderColor: "#dc3545",
//                  borderWidth: 1
//                },
//                {
//                  label: "BUSINESS",
//                  data: [96450, 125821, 132072, 107508, 127469, 81591, 127819],
//                  backgroundColor: "#6c757d",
//                  borderColor: "#6c757d",
//                  borderWidth: 1
//                },
//                {
//                  label: "RELAXATION",
//                  data: [815262, 879740, 695645, 965567, 940925, 970029, 918511],
//                  backgroundColor: "#17a2b8",
//                  borderColor: "#17a2b8",
//                  borderWidth: 1
//                }
            ]
        }
    })






    function setData() {
        $.get("/api/v1/domesticVisitorData?startDate=20220801&endDate=20221001", function (response) {
            response.forEach(function(data){
                console.log(data.sum)

                sum.push(data.sum);
            })
        })
    }
})(jQuery);

//const config = {
//  type: 'bar',
//  data: [65, 59, 80, 81, 56, 55, 40],
//  options: {
//    scales: {
//      y: {
//        beginAtZero: true
//      }
//    }
//  },
//};
////const labels = Utils.months({count: 7});
//
////const data = {
////  labels: labels,
////  datasets: [{
////    label: 'My First Dataset',
////    data: ,
////    backgroundColor: [
////      'rgba(255, 99, 132, 0.2)',
////      'rgba(255, 159, 64, 0.2)',
////      'rgba(255, 205, 86, 0.2)',
////      'rgba(75, 192, 192, 0.2)',
////      'rgba(54, 162, 235, 0.2)',
////      'rgba(153, 102, 255, 0.2)',
////      'rgba(201, 203, 207, 0.2)'
////    ],
////    borderColor: [
////      'rgb(255, 99, 132)',
////      'rgb(255, 159, 64)',
////      'rgb(255, 205, 86)',
////      'rgb(75, 192, 192)',
////      'rgb(54, 162, 235)',
////      'rgb(153, 102, 255)',
////      'rgb(201, 203, 207)'
////    ],
////    borderWidth: 1
////  }]
////};


 

$( document ).ready(function() {

  $("#menu-onoff").click(function() {     //add the class to the clicked element
    $('.left-bar').toggleClass("showhide");
    $('.main-content').toggleClass("main-full"); 
    $('.left-bar').toggleClass("mob-menu");  
  }); 

  $("#menu-onoff-mob").click(function() {  
    $('.left-bar.mob-menu').toggleClass("mob-open"); 
    $('.sidebar-overlay').toggleClass("overlay-show"); 
  }); 

  $(".sidebar-overlay").click(function() {   
    $('.left-bar.mob-menu').toggleClass("mob-open"); 
    $('.sidebar-overlay').toggleClass("overlay-show"); 
  });

  $(".toggle-left-menu").click(function() {   
    $('.left-bar').toggleClass("small-left-bar");
    $('.main-content').toggleClass("big-content");
    $('.toggle-left-menu').toggleClass("active"); 
  });

 
const cardChart1 = new Chart(document.getElementById('card-chart1'), {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            pointBackgroundColor: 'transparent',
            data: [65, 59, 84, 84, 51, 55, 40]
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                min: 30,
                max: 89,
                display: false,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }
        },
        elements: {
            line: {
                borderWidth: 1,
                tension: 0.4
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4
            }
        }
    }
});
const cardChart2 = new Chart(document.getElementById('card-chart2'), {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            pointBackgroundColor:'transparent',
            data: [1, 18, 9, 17, 34, 22, 11]
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                min: -9,
                max: 39,
                display: false,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }
        },
        elements: {
            line: {
                borderWidth: 1
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4
            }
        }
    }
});
const cardChart3 = new Chart(document.getElementById('card-chart3'), {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: [78, 81, 80, 45, 34, 12, 40],
            fill: true
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        elements: {
            line: {
                borderWidth: 2,
                tension: 0.4
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4
            }
        }
    }
});
const cardChart4 = new Chart(document.getElementById('card-chart4'), {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
            barPercentage: 0.6
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawTicks: false
                },
                ticks: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false,
                    drawBorder: false,
                    drawTicks: false
                },
                ticks: {
                    display: false
                }
            }
        }
    }
});

  
});
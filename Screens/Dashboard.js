import React, { memo, useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView, StyleSheet, View, Text, Button, StatusBar, Image, TouchableOpacity, ScrollView, Alert, FlatList, ActivityIndicator, InteractionManager } from 'react-native';
import { toptreding } from '../Json/toptreding.js';
import { toptreding1 } from '../Json/toptreding1.js';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import moment from "moment";

const Dashboard = ({ route, navigation }) => {

    const [schedule, setSchedule] = useState('');
    const [type, setType] = useState("All");
    const [status, setStatus] = useState("upcoming");

    console.log(type, status)
    // type: `+ type +`,
    // status: `+ status +`,
    const query = `query schedule {
        newSchedule (
          type: "`+ type.toString() + `",
          status: "`+ status.toString() + `",
          page: 1
        )
        {
            seriesView
            seriesAvailable
              seriesID
              matchType
              league
              seriesName
              matches {
                          seriesID
                          league
                          currentinningsNo
                          currentInningsTeamName
                          seriesName
                          homeTeamName
                          awayTeamName
                          toss
                          startEndDate
                          matchStatus
                          matchID
                          matchType
                          statusMessage
                          matchNumber   
                          venue
                          matchResult      
                          teamsWinProbability {        
                                              homeTeamShortName        
                                              homeTeamPercentage       
                                              awayTeamShortName       
                                              awayTeamPercentage       
                                              tiePercentage     
                                              }  
                          matchScore {     
                                      teamShortName       
                                      teamID  
                                      teamFullName        
                                      teamScore {          
                                                  inning          
                                                  inningNumber          
                                                  battingTeam          
                                                  runsScored          
                                                  wickets        
                                                  overs          
                                                  runRate          
                                                  battingSide          
                                                  teamID          
                                                  battingTeamShortName         
                                                   declared          
                                                   folowOn        
                                                   }     
                                      }      
                          startDate      
                          playerID     
                          playing11Status      
                          probable11Status      
                          playerOfTheMatch      
                          playerofTheMatchTeamShortName      
                          firstInningsTeamID      
                          secondInningsTeamID      
                          thirdInningsTeamID      
                          fourthInningsTeamID      
                          league    
                      }  
                      
                  }
      }`;

    const variables = { type: type, status: status, page: 1 };


    async function getCharacters() {
        let results = await fetch('https://api.devcdc.com/cricket', {
            method: 'POST',

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                query

            })
        })
        let Scheduledata = await results.json();
        setSchedule(Scheduledata.data)
        console.log(Scheduledata.data)
    }

    useEffect(() => {
        getCharacters()

    }, [type, status])

    function duetime(dtime)
    {
        var dateFuture = new Date(new Date(Number(dtime)));
        console.log("dateFuture",dateFuture)
        console.log(moment(dateFuture).format('D MMMM, h:mm a'))

        var rtime='';
var dateNow = new Date();
if(dateFuture.getDate()==dateNow.getDate()){

var seconds = Math.floor((dateFuture - (dateNow))/1000);
var minutes = Math.floor(seconds/60);
var hours = Math.floor(minutes/60);
var days = Math.floor(hours/24);
var days = Math.floor(hours/24);

hours = hours-(days*24);
minutes = minutes-(days*24*60)-(hours*60);
seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

console.log(hours,"hrs",minutes,"mins to toss")
rtime=hours+" hrs "+minutes+" mins to toss";
}else{
 rtime= moment(dateFuture).format('D MMMM, h:mm a')
}
return rtime;

    }

    return (
        <SafeAreaView style={{ width: wp('100%'), height: hp('100%'), backgroundColor: '#121b2a' }}>

            {/* <StatusBar  backgroundColor='#b88864' /> */}
            <Text style={{ padding: 10, fontSize: 20, color: '#fff' }}>Schedule</Text>

            <View style={{ height: hp('6%'), width: wp('100%'), backgroundColor: '', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setStatus('upcoming') }}>


                    <Text style={{ color: status == 'upcoming' ? '#5b919e' : '#fff' }}>Upcoming</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setStatus('live') }}>

                    <Text style={{ color: status == 'live' ? '#5b919e' : '#fff' }}>Live</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setStatus('completed') }}>

                    <Text style={{ color: status == 'completed' ? '#5b919e' : '#fff' }}>Results</Text>

                </TouchableOpacity>
            </View>
            <Text style={{ width: wp('100%'), height: hp('0.1%'), backgroundColor: '#d4d4d4', alignSelf: 'center', color: '#000' }}></Text>


            <ScrollView>

                <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('90%'), alignSelf: 'center', backgroundColor: '#1e2831', borderRadius: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => { setType('All') }}>

                        <View style={{ width: wp('22%'), height: hp('4%'), backgroundColor: '#1e2831', borderColor: '#35d924', borderWidth: type == 'All' ? 1 : 0, borderRadius: 20, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>ALL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setType('International') }}>

                        <View style={{ width: wp('33%'), height: hp('4%'), backgroundColor: '#1e2831', borderColor: '#35d924', borderWidth: type == 'International' ? 1 : 0, borderRadius: 20, marginHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>INTERNATIONAL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setType('Domestic') }}>
                        <View style={{ width: wp('25%'), height: hp('4%'), backgroundColor: '#1e2831', borderColor: '#35d924', borderWidth: type == 'Domestic' ? 1 : 0, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff' }}>DOMESTIC</Text>
                        </View>
                    </TouchableOpacity>


                </View>
                <View>
                    <FlatList
                        key={1}
                        data={schedule.newSchedule}
                        ListEmptyComponent={<ActivityIndicator size="large" style={{ justifyContent: 'center', marginTop: hp('35%') }} />}
                        renderItem={
                            ({ item, index }) => (
                                <View style={{ padding: 10 }} key={index}>
                                    <View style={{ paddingHorizontal: 10, width: wp('93%'), height: hp('6%'), backgroundColor: '#28323b', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 5, marginLeft: 5 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('88%') }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {item.league == "International" ?
                                                    <View style={{ height: hp('3.5%'), width: wp('10%'), backgroundColor: '#e82b23', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#fff' }}>IND</Text>
                                                    </View> :
                                                    <View style={{ height: hp('3.5%'), width: wp('10%'), backgroundColor: '#5b919e', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: '#fff' }}>DOM</Text>
                                                    </View>
                                                }
                                                <Text style={{ color: '#fff', marginLeft: 20 }}>{item.seriesName.length > 30 ? item.seriesName.substring(0, 30) + " ..." : item.seriesName}</Text>
                                            </View>
                                            <Icon1 name="angle-right" size={25} color="#35d924" />

                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <FlatList
                                            horizontal={true}
                                            key={1}
                                            showsHorizontalScrollIndicator={false}
                                            data={item.matches}
                                            renderItem={
                                                ({ item, index }) => (
                                                    <View key={index} style={{
                                                        marginHorizontal: 5, backgroundColor: '#28323b', width: wp('86%'), borderRadius: 5, padding: 15
                                                    }}>
                                                        <View style={{}}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Text style={{ fontSize: 15, color: '#747d8c' }}>{item.matchNumber}</Text>
                                                                        <>
                                                                            {status == "upcoming" ?
                                                                                <View style={{ borderWidth: 1, borderColor: '#5b919e', borderRadius: 15, height: hp('3%'), width: wp('20%'), justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                                                                    <Text style={{ fontSize: 12, color: '#5b919e' }}>UPCOMING</Text>
                                                                                </View>
                                                                                : <>
                                                                                    {status == "live" ?
                                                                                        <View style={{ borderWidth: 1, backgroundColor: '#e82b23', borderRadius: 15, height: hp('3%'), width: wp('15%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                                                                            <View style={{ height: 5, width: 5, borderRadius: 5, backgroundColor: '#ffffff', marginRight: 5 }}>
                                                                                            </View>
                                                                                            <Text style={{ fontSize: 12, color: '#fff' }}>LIVE</Text>
                                                                                        </View>
                                                                                        :
                                                                                        <View style={{ borderWidth: 1, borderColor: '#d9d9d9', backgroundColor: '#545353', borderRadius: 15, height: hp('3%'), width: wp('25%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                                                                            <View style={{ height: 5, width: 5, borderRadius: 5, backgroundColor: '#d9d9d9', marginRight: 5 }}>
                                                                                            </View>
                                                                                            <Text style={{ fontSize: 12, color: '#d9d9d9' }}>COMPLETED</Text>
                                                                                        </View>
                                                                                    }</>
                                                                            }</>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Icon name="location" size={15} color="#e82b23" />
                                                                        <Text style={{ fontSize: 14, color: '#747d8c', marginLeft: 1 }}>{item.venue}</Text>
                                                                    </View>
                                                                </View>
                                                                {status == "upcoming" ?
                                                                    <View style={{ height: hp('6%'), width: wp('12%'), backgroundColor: '#1e2831', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Icon name="notifications-outline" size={30} color="#fff" />
                                                                    </View> :
                                                                    <></>
                                                                }


                                                            </View>
                                                            <View>
                                                                {status == "upcoming" ?
                                                                <>
                                                                    <View style={{ backgroundColor: '#1e2831', width: wp('75%'), height: hp('7%'), marginTop: 20, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5 }}>
                                                                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.homeTeamName}</Text>

                                                                        <View style={{ borderWidth: 1, borderColor: '#35d924', borderRadius: 15, height: hp('3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                                                            <Text style={{ fontSize: 12, color: '#35d924' }}>{item.matchType}</Text>
                                                                        </View>
                                                                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.awayTeamName}</Text>

                                                                    </View>
                                                                    <View style={{ backgroundColor: '#1e2831', width: wp('75%'), height: hp('3.5%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, marginTop: 20 }}>
                                                                    <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>{duetime(item.startDate)}</Text>
                                                                </View>
                                                                </>
                                                                    :
                                                                    <>
                                                                        {status == "live" ?
                                                                        <>
                                                                            <View style={{ backgroundColor: '#1e2831', width: wp('75%'), height: hp('7%'), marginTop: 20, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5 }}>
                                                                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                                                    <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[0].teamShortName}</Text>
                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                        <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: '#35d924', marginRight: 5 }}>
                                                                                        </View>
                                                                                        {item.matchScore[0].teamScore[0] ?
                                                                                            <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[0].teamScore[0].runsScored}/{item.matchScore[0]?.teamScore[0]?.wickets}<Text>({item.matchScore[0]?.teamScore[0]?.overs})</Text></Text> :
                                                                                            <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>Yet to bat</Text>
                                                                                        }</View>

                                                                                </View>

                                                                                <View style={{ borderWidth: 1, borderColor: '#35d924', borderRadius: 15, height: hp('3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                                                                    <Text style={{ fontSize: 12, color: '#35d924' }}>{item.matchType}</Text>
                                                                                </View>
                                                                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                                                    <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[1].teamShortName}</Text>

                                                                                    <View >
                                                                                        
                                                                                        {item.matchScore[1].teamScore[0] ?
                                                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                        <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: '#35d924', marginRight: 5 }}>
                                                                                        </View>
                                                                                            <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[1].teamScore[0].runsScored}</Text>
                                                                                            </View> :
                                                                                            <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>Yet to bat</Text>
                                                                                        }</View>
                                                                                </View>

                                                                            </View>
                                                                            <View style={{ backgroundColor: '#1e2831', width: wp('75%'), height: hp('3.5%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, marginTop: 20 }}>
                                                                            <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>{item.statusMessage}</Text>
                                                                        </View>
                                                                        </> :
                                                                            <>
                                                                            <View style={{ backgroundColor: '#1e2831', width: wp('75%'), height: hp('7%'), marginTop: 20, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5 }}>
                                                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                                                <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[0].teamShortName}</Text>
                                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: '#35d924', marginRight: 5 }}>
                                                                                    </View>
                                                                                    {item.matchScore[0].teamScore[0] ?
                                                                                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[0].teamScore[0].runsScored}/{item.matchScore[0]?.teamScore[0]?.wickets}<Text>({item.matchScore[0]?.teamScore[0]?.overs})</Text></Text> :
                                                                                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>Yet to bat</Text>
                                                                                    }</View>

                                                                            </View>

                                                                            <View style={{ borderWidth: 1, borderColor: '#35d924', borderRadius: 15, height: hp('3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                                                                <Text style={{ fontSize: 12, color: '#35d924' }}>{item.matchType}</Text>
                                                                            </View>
                                                                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                                                <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[1].teamShortName}</Text>

                                                                                <View >
                                                                                    
                                                                                    {item.matchScore[1].teamScore[0] ?
                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: '#35d924', marginRight: 5 }}>
                                                                                    </View>
                                                                                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{item.matchScore[1].teamScore[0].runsScored}</Text>
                                                                                        </View> :
                                                                                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>Yet to bat</Text>
                                                                                    }</View>
                                                                            </View>

                                                                        </View>

                                                                        <View style={{ backgroundColor: '#1e2831', width: wp('75%'), height: hp('3.5%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, marginTop: 20 }}>
                                                                        <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>{item.matchResult}</Text>
                                                                    </View>
</>
                                                                        }
                                                                    </>

                                                                }
                                                            </View>


                                                            
                                                            <Text style={{ fontSize: 15, color: '#747d8c', marginTop: 10 }}>WIN PERCENTAGE</Text>
                                                            {item.teamsWinProbability.homeTeamPercentage ?
                                                                <View>
                                                                    <View style={{ backgroundColor: '#fff', width: wp('75%'), borderRadius: 10, marginTop: 10 }}>
                                                                        <Progress.Bar progress={item.teamsWinProbability.homeTeamPercentage / 100} width={wp('75%')} color={'#35d924'} borderWidth={0} />
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('75%'), marginTop: 5 }}>
                                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: '#35d924', marginRight: 5 }}>
                                                                            </View>
                                                                            <Text style={{ fontSize: 15, color: '#747d8c' }}>{item.homeTeamName}({item.teamsWinProbability.homeTeamPercentage}%)</Text>
                                                                        </View>
                                                                        {item.teamsWinProbability.tiePercentage?
                                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: '#759e70', marginRight: 5 }}>
                                                                            </View>
                                                                            <Text style={{ fontSize: 15, color: '#747d8c' }}>TIE ({item.teamsWinProbability.tiePercentage}%)</Text>
                                                                        </View>:
                                                                        <></>}
                                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: '#ffffff', marginRight: 5 }}>
                                                                            </View>
                                                                            <Text style={{ fontSize: 15, color: '#747d8c' }}>{item.awayTeamName}({item.teamsWinProbability.awayTeamPercentage}%)</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                :
                                                                <Text style={{ color: '#fff', marginTop: 10 }}>Win projrctions to be updated soon...</Text>
                                                            }
                                                        </View>

                                                    </View>
                                                )
                                            }
                                        />

                                    </View>
                                </View>

                            )} />



                    <View style={{ height: 150 }}>

                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default memo(Dashboard);
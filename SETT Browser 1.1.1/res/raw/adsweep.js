javascript:(function () {
adsweep();

var version = '2.0.3';

function adsweep(){	


		if(location.href){
			window.adsweepVersion=version;
			window.ua=navigator.userAgent;			
			window.URL = location.href;
			
			var countTries=0;
			function checkDOM(){
				if(countTries<120){
					if(document.getElementsByTagName("HEAD")[0] && document.getElementsByTagName("BODY")[0]){
							adsweep_core();
							window.addEventListener("load", adsweep_removeAdNodes, false);
							
					} else {
						countTries++;
						window.setTimeout(checkDOM,250);
					}
				}
			}
			checkDOM();						
		}
}

function adsweep_core(){
	// Whitelist. AdSweep does nothing for URLs listed here.
	var whitelist=[];
	
	// List of sites for which you don't want to hide common ad patterns 
	var adPatternExceptions=['boulanger.fr','chess.com','docs.google.com','gamestar.de','google.com.hk/finance','google.com/calendar','hulu.com','mail.google.com','moskva.fm','picasaweb.google.com','spreadsheets.google.com','wikipedia.org','winfuture.de']; // I'm adding Hulu because it's causing a false-positive and I can't test, as I am not in the US.
	
	// List custom CSS selectors that you want to hide on specific sites
	var sites=new Array();
	sites['360.yahoo.com']='#ymgl-north-wrapper,#ymgl-feedback,#ygma';
	sites['3dnews.ru']='.mbanner,.ctn_center,td[style*="860px"],iframe[src*="ppc\.fcgi"],img[src*="banner"],div[style^="width: 200px;"]';
	sites['4chan.org']='div[class^="ad-text"],div[class^="ad-title"],img[src*="http://content.4chan.org/tmp"]';
	sites['accuweather.com']='#zagWindow,.zagContainer';
	sites['afisha.yandex.ru']='[class^="banner"]';
	sites['ag.ru']='#upadbg2,#rotating_banners,#rolbar';
	sites['ahtim.com']='.cfac_container_1,#rightsidebar>h2:first-of-type,#rightsidebar>p:first-of-type';
	sites['anandtech.com']='#topmarq,.newTopTop,#boxfooter';
	sites['anonymouse.org']='#mouselayer';
	sites['answers.yahoo.com']='#yan-sponsored';
	sites['answers.com']='#top_radlinks,#atff,#g5';
	sites['aol.com']='.addl_promo,[class^="containerInnerDiv_"],.tunomeArea,#web_container,div.navItem[dojoattachpoint="todayItem"],.ws_main_pane>#sysFolders>div:first-child,h1[id="leftNav"][class="SROnly"],.hatLinks,div[style*="google_search-combined.png"],.searchGoogleText';
	sites['arstechnica.com']='#Banner';
	sites['auto.ru']='img[src*="rl.auto.ru"],#begunRoot,#news';
	sites['auto.yandex.ru']='.teaser';
	sites['autonews.ru']='div[id^="autonews_spec_src"],div[class^="banner"],table[bgcolor="#000000"],table>tbody>tr>td>object,div[id^="magna"]';
	sites['bbc.co.uk']='#bbccom_leaderboard,#bbccom_mpu,#bbccom_module_c';
	sites['br.msn.com']='#shop,[height="39"][width="972"],[id^="ebay"],[id^="match"],#morelinks';
	sites['broadcastnewsroom.com']='#rightside,#shopperartbox,.bfua,.sideadsbox,#content>center';
	sites['bt.dk']='#promoted-articles,[id^="AT_ANCHOR_DIV"],[id^="FlashID"],[class^="AD"],img[src*="annoncen"],object[width="930"],object[width="950"]';
	sites['besame.fm']='.header>div:first-of-type,.header>div:first-of-type+div,#Div1';
	sites['betanews.com']='[class$="_boxad"]';
	sites['bild.de']='[id*="Banner"]';
	sites['bit-tech.net']='div#body div#shopping_box,div#container>div[style]';
	sites['business.dk']='.mid-banner,.ticker-wrapper,[class~="ad-col"],iframe[height="76"],.top-banner';
	sites['captain.co.il']='[id^="dclk_"],[src*="/banners/"],[name^="neto_frame"]';
	sites['championat.ru']='[class*="banner"]';
	sites['chess.com']='.adzone';
	sites['cleacuisine.fr']='div#partenaire h1:nth-of-type(5),div#partenaire h1:nth-of-type(5)~a';
	sites['cnews.ru']='.NewsBodyLeftInclude,#magna_block,#Top_Banner,img[id*="banner"],div[id^="cnews_"],div[style="float:left; margin-top:-20px; position:relative;"]';
	sites['cnn.com']='.cnnWireAdLtgBox';
	sites['crunchgear.com']='#bugs,#site_supporters';
	sites['computerworld.dk']='#newslettercampaign,div[style*="width: 196px"][style*="100px"],.leaderboard';
	sites['dailymail.co.uk']='.commercial-horizontal-footer,#DATING_MODULE,.banner-adverts';
	sites['demonoid.com']='hr[width="100%"],iframe[src*="/cached/ab_"],iframe[width="742"][height="90"],td[width="119"][height="600"],hr+span[style="color: #777777; background: #cdd0b2; padding-left: 10px; padding-right: 10px; font: bold 102%; border: 1px solid #777777;"]';
	sites['designerstalk.com']='td[width="210"][align="right"][valign="top"]';
	sites['designyoutrust.com']='#picad_overlay_div,.adblock,#left>.adblock+script+center,#left>h4,#left>table[width="580"],img[src^="http://stats.technoratimedia.com"],img[src^="http://stats.technoratimedia.com"]+table';
	sites['di.fm']='body>table>tbody>tr>td>table>tbody>tr:nth-child(3)>td:nth-child(2)>table>tbody>tr:first-child>td:first-child,a[href*="facebook"],a[href*="twitter"],a[href*="shoutcast"]';
	sites['dict.leo.org']='.sidebar,.standard_banner'; 
	sites['diendan.hocmai.vn']='div.smallfont>a>img,div.header,div.page>div>table>tbody>tr>td>table>tbody>tr>td>embed,form>div.navbg,table.leftads';
	sites['digg.com']='.searchad,#block_ad_msft,.item_ad_image,.msad,#comments_ad_msft,.comments_ad_image';
	sites['digitalspy.co.uk']='li.ez:nth-last-of-type(8),td[id^="td_post_"] div[style^="float:right"]:nth-of-type(2),div[id^="edit"]:first-child div:nth-of-type(2) table:nth-of-type(1) tr:nth-of-type(2) td table td:nth-of-type(3),div[id^="edit"]:first-child div:nth-of-type(2) tr:nth-of-type(2) div';
	sites['download.com']='.bidwar';
	sites['drive.ru']='#ad480-wrapper td:first-of-type, .noprint';
	sites['ebay.fr']='#NarrowSectionContainer1>div:not(:last-of-type)';
	sites['ekstrabladet.dk']='#FlashID1x,.xmain-head,[class^="eb_ad"],[class*="annonce"],[id*="annonce"],[class^="ad"][class*="x"],div[id="front-2"][class="drfront"]+.eb_column-left';
	sites['ekstrabladet.tv']='#FlashID1x,.xmain-head,[class^="eb_ad"],[class*="annonce"],[id*="annonce"],[class^="ad"][class*="x"],div[id="front-2"][class="drfront"]+.eb_column-left';
	sites['elitistjerks.com']='[class^="dca"],[class^="dcb"],[class^="dcc"][style*="728px"],[class^="dcc"][style*="728px"]+[class^="dcb"]';
	sites['epn.dk']='#dspPageTop,.annCapBox';
	sites['f1news.ru']='#rightBanner240,#yad';
	sites['ferra.ru']='[class*="pricead"],[id*="vertelka"],.top-banner';
	sites['fibromyalgie.xooit.com']='div[style*="90px"]';
	sites['fishki.net']='[id*="adland"],iframe';
	sites['flyertalk.com']='center,table[style*="width:160px"]';
	sites['focus.de']='#adsd_topbanner';
	sites['forum.satmag.fr']='div[style^="padding: 6px"],center';
	sites['forums.worldofwarcraft.com']='td[align="left"][valign="top"]+td[align="center"][valign="top"],#ftrText';
	sites['games.yandex.ru']='.lnk';
	sites['gametech.ru']='body>table>tbody>tr[class="header"]';
	sites['gazeta.pl']='.HP_ecomm,.ludziePisza,.HP_smallBox';
	sites['gazeta.ru']='#no_print,[class*="no_print"]';
	sites['girlgeniusonline.com']='form[action*="paypal"],#SponsorTable,[href*="merchant"],[href*="donate"],[href*="/vote/"],[href*="childsplaycharity"],#MainTable>tbody>tr:nth-child(4),#MainTable>tbody>tr:nth-child(5),#MainTable>tbody>tr:nth-child(6),#MainTable>tbody>tr:nth-child(7),#MainTable>tbody>tr:nth-child(8),#MainTable>tbody>tr:nth-child(9)';
	sites['gismeteo.ru']='.bnr,.RBC';
	sites['gizmodo.']='#sideBarGoogleAnnounces';
	sites['global-sms.de']='div[style*="width: 810px; height: 449px"]';
	sites['godaddy.com']='.hp_celeb,img[src*="banner_bradwins"],.celeb,div[style*="bobblog"],div[style*="siteseal"],#hp_videovote_links_before,.hp_player,#hp_connectiondiv';
	sites['google.']='#gsr div#tads,#gsr table#mbEnd';
	sites['guloggratis.dk']='#left_col,#right_col,#page_bottom,[id^="top_banner"]';
	sites['haaretz.co.il']='[id^="dclk_"],[src*="/banners/"],[name^="neto_frame"],#flashad,#dcPlazma,#top_banners';
	sites['habrahabr.ru']='#main-page>a[target="_top"],#main-page>object';
	sites['heise.de']='#bannerzone,.bcadv,.naviad,.leaderboard,.contentbanner,.top';
	sites['hh.ru']='[class*="banners"],[id*="banner"]';
	sites['hothardware.com']='#LeftSidebar';
	sites['idnes.cz']='.col-d,[id^="r26"],.widesquare,.counters,.ahead,.r-head,.r-body';
	sites['ifolder.ru']='#FlashDiv,[class="side_ban"]>*,body>table>tbody>tr>td[colspan="3"]';
	sites['imdb.com']='#navstrip_wrapper,#top_rhs_wrapper,#top_center_wrapper';
	sites['itrate.ru']='.top_block>div[style="margin-bottom: 2px;"],.banner_block_big';
	sites['iwiw.hu']='#sponsors,#right-cell,.banner_top,#frameplace_3466';
	sites['ixbt.com']='.wrapcenter,.offer,#nl_header,#col3>.front,table[width="468"]';
	sites['lenta.ru']='#b240,#ts-svoboda';
	sites['lingvo.yandex.ru']='.l-scrap>div[style="margin:1em 0"]';
	sites['livejournal.com']='.adv-block';
	sites['index.hu']='#container_adoceanindexhulhghephfdh,#also_bannerek';
	sites['kijiji.']='#partners,#googsense';
	sites['km.ru']='iframe';
	sites['latimes.com']='#richad,a[href^="http://www.amazon.com/gp/"],a[href^="http://latimes.newsstand.com"],a[href^="http://store.latimes.com"]';
	sites['lifehacker.com']='img[alt$="Shop"],a[href*="amazon"],a[href*="auto-show"],#sidebartopstories ul';
	sites['linux-mag.com']='#curtain';
	sites['linuxreaders.com']='[href*="packtpub"],#southsidebar~*';
	sites['live.com']='.sb_adsW,.adB';
	sites['liveinternet.ru']='[id*="banmain"]';
	sites['loveplanet.ru']='iframe,[id^="popup_"],#ml_c1763';
	sites['mail.live.com']='.cAdBannerContainer,#RadAd_TodayPage_Banner,#adHeader,#RadAd_Banner,#CustComm_120x60,.c120x60CustomerCommContainer,.CustComm_120x60,td.dSideAds,#TodayTabSection,.cAdHeaderContainer,.AdHeaderContainer';
	sites['mail.yahoo.com/dc']='#gx_vnews,#nwPane,#swPane,#largePane,#emptyFolderContainer';
	sites['mail.yahoo.com/mc']='#monad,iframe#MON,#gx_vnews,#ch_col_h1,#MNW,#MNW+.separator,#gx_idf_c,#northbanner';
	sites['majorgeeks.com']='table[width="336"][height="100%"][cellpadding="0"][cellspacing="0"][border="0"][valign="bottom"][align="right"][style="padding-left:5px;"][class="author"],table:nth-of-type(2)>tbody>tr>td.news2>div>table:first-of-type,table[cellpadding="1"][cellspacing="0"][border="0"][width="100%"][align="center"][style*="margin-top:4px;"],div>table:first-of-type>tbody>tr:nth-of-type(2)>td,div>table:nth-of-type(2)>tbody>tr>td:first-of-type>p>table.navlink>tbody>tr:first-of-type>td>center,div>table:nth-of-type(2)>tbody>tr>td:first-of-type>p>table.navlink>tbody>tr:first-of-type>td>center:first-of-type,div>table:nth-of-type(2)>tbody>tr>td:nth-of-type(3)>center:nth-of-type(6),a[href^="https://secure."]';
	sites['marktplaats.nl']='.vipAmblock,[id*="placeholder_bannerData"]';
	sites['maisfutebol.iol.pt']='body>table:first-of-type,#bg_top div.autoportal,#banner_mrec';
	sites['maps.mail.ru']='.left_banner';
	sites['mashable.com']='#tbs,div#right-column>div.what-is-mashable:nth-of-type(3),div#right-column>div.what-is-mashable:nth-of-type(12),div#right-column>div.what-is-mashable:nth-of-type(16),div#right-column>div.what-is-mashable:nth-of-type(6),div#right-column>div.squeeze.subscribe:nth-of-type(4),div[id^="div-"],.startup-review,.banner_300x250,li.pga,div#footer>ul.links,ul.banners,.partners,.left-col';
	sites['maximumpc.com']='#kick-ass-offers,[id*="block-buysub"],#top-banner';
	sites['meebo.com']='#welcomeWin';
	sites['mobbit.info']='div[class*="begun"],div[id^="lx"],div[class^="y5"],td[width="478"][height="60"]';
	sites['mobile-review.com']='center>object';
	sites['moneycontrol.com']='#col180>.PB5,#col180>.PB10,link[href*="justin"]+div,link[href*="justin"]+div+div,#mat_x10,#geo_interview,[value*="moneycontrol.com/images/promo"],[src*="moneycontrol.com/images/promo"],#FinContentx161+object+p,#FinContentx161+object+p+p,#FinContentx161+object+p+p+div,#FinContentx161+object+p+p+div+p,#FinContentx161+object+p+p+div+p+p';
	sites['mouse.co.il']='[name^="neto_frame"],#flashad';
	sites['msn.']='#lgad,#shopping';
	sites['mydrivers.com']='[id^="ad_770_60"]+table[height="90"][width="770"],td[width="133"],td[bgcolor="#ffffff"][width="634"][valign="top"]>table[height="70"][bgcolor="#eaeaea"][width="100%"],#sidebar5,#sidebar6[style*="top: 10px"]';
	sites['mykawartha.com']='[href$="/seen"] img,[href*="torstardigital.com"] img,[href*="metroland.com"] img,[class^="notifyad"],#realestatebox';
	sites['myspace.com']='div[id*="sponsoredlinks"],div[id^="tv_vid_medrec"],#leaderboard';
	sites['myvideo.de']='#fullbanner2_container,table[id="pageFW"]>tbody>tr:first-of-type';
	sites['nana.co.il']='#topBannerBlock';
	sites['nana10.co.il']='#topBannerBlock';
	sites['nationet.com']='td.consolebackground+td[class="consoleBackground"][align="right"][valign="top"]';
	sites['nationwide.co.uk']='#promo-campaigns,#promo-latest-news,#promo-mini-promo,.mortlegalbox,#creditcard-wrapper>#container1,#creditcard-wrapper>#container2,#current-account-wrapper>#container1,#current-account-wrapper>#container2,#insurance-wrapper,#investments-wrapper>#container1,#investments-wrapper>#container2,#loans-wrapper>#container1,#loans-wrapper>#container2,#mortgage-main-content>#campaign-top,#savings-wrapper>#container2,#savings-wrapper>#container3,#travel-wrapper,img[src$="395x152.gif"],img[src$="395x111.gif"],img[src$="395x140.gif"],img[src$="insurance_banner.gif"],img[src$="surgeries_banner.gif"],img[src$="contact_us_welcome.jpg"],img[src$="emailwelcome2.jpg"],img[src$="complaint2.jpg"],img[src$="banner_internetbanking.gif"]';
	sites['neowin.net']='[id*="header-banner"],[id*="content-main-square"],[id*="content-leaderboard"],div[style*="background: #fff;float:right;padding-left:10px;text-align:center;width:300px"],div[style*="background: #fff;float: right;padding-left: 10px;text-align: center;width: 120px;"],#sidebar-recommendations,#rev-fullbanner,#content-leaderboard';
	sites['news.cnet.com']='#topMPU';
	sites['newsru.com']='table[width="430"][bgcolor="#D6D6D6"],table[width="770"][bgcolor="#052A9D"],table[width="770"][onclick*="superstyle.ru"],iframe[width="100"][height="100"],table[width="240"][style*="#CED0E3"],table[width="240"][style*="#eeeeee"],div[style*="#E6E6E6"],div[style*="#0016A6"],noindex';
	sites['newz.dk']='#sweeplist,.partnersites,div[class^="ad_"]';
	sites['nytimes.com']='[id^="TP_container"],[id^="adx"],.adCreative,.extraBox>#toggleDiv,object[height="30"][width="70"],#bColumn .columnGroup object[height="150"][width="336"]';
	sites['nnm.ru']='.banner';
	sites['newstimes.com']='body.bodyStyle>span#default>span#home>div.contentStyle>table.regionParent>tbody>tr>td>table.regionParent:first-of-type,.adElement,[id^="adPosition"],body.bodyStyle>span#default>span#home>div.contentStyle>table.regionParent>tbody>tr>td>table:nth-of-type(6)>tbody>tr>td:nth-child(3)>table>tbody>tr:nth-child(2)';
	//sites['ojogo.pt']='body>table:first-of-type>tbody>tr>td>table:first-of-type,body>table:nth-of-type(3)>tbody>tr:first-child>td:nth-of-type(2)>table>tbody>tr:first-child>td>table:nth-of-type(2),table[width="817"]>tbody>tr>td:last-child>table>tbody>tr:nth-child(4),body>table:nth-of-type(3)>tbody>tr:nth-of-type(2)>td>table>tbody>tr>td:nth-of-type(3)>table>tbody>tr:first-child>td>table:first-of-type,[href*="jogo_revista_todas"],[href*="sportmultimedia.pt"],[href*="controlinveste.pt"],[href*="twitter.com/ojogo"]';
	sites['novoteka.ru']='body>table[bgcolor="#960400"],.lpad';
	sites['nrg.co.il']='[id^="banner_"],[src*="/banners/"],[name^="neto_frame"],#topBanner,#bRColumnText,#bLColumnText,#left_google_ban,#channel_plasma';
	sites['ojogo.pt']='body>table:first-of-type>tbody>tr>td>table:first-of-type,body>table:nth-of-type(3)>tbody>tr:nth-of-type(2)>td>table>tbody>tr>td:nth-of-type(3)>table>tbody>tr:first-child>td>table:first-of-type,[href*="sportmultimedia.pt"],[href*="controlinveste.pt"]';
	sites['oper.ru']='#topbanner,.banner,td[class="banners"]>a>img[height="90"],a[href*="vott.ru"],.vott_wrapper';
	sites['orange.co.uk']='#home_pushdown,#home_mpu,#home_orangeshop';
	sites['osnews.com']='div#header>div.ad,div#content>div#side>div#sidebar>script,div#content>div#side>div#sidebar>iframe,div#content>div#side>div#sidebar>p a[href^="http://www.puremobile"]';
	sites['overclockers.ru']='[id^="y5_"],td[width="73"],td[colspan="2"][style="background:#ccffff"],body>img[height="3"],table[height="67"],body>center,body>table[height="72"]';
	sites['photobucket.com']='#cellAd,#columnLeft_po';
	sites['physorg.com']='span.box-ads p:nth-of-type(1),span.box-ads p:nth-of-type(2),span.box-ads p:nth-of-type(3),p.hr';
	sites['play.yandex.ru']='.lnk';
	sites['pcmag.com']='#w_header .leaderboard,#lenovo_resource_center,.spotlight_hdr,#informLogo,#w_graveyard,#product_spotlight,#homepageSubForm,[id^="special_offers"],img[width="440"][height="56"],[class^="mrktcell"],[class^="AdModule_"],[class^="sponsors"],.bestselling';
	sites['pcwelt.de']='#sponsoredlink+.teaser_list_body';
	sites['pornolab.net']='img[src*="/seksikiss.ru/"],img[src*="/call/"],div[id="bn-pme-1"]';
	sites['programme-tv.net']='#pcp_overlay';
	sites['prohardver.hu']='#jobbhcontent';
	sites['ptitchef.com']='[id^="popup_"]';
	sites['rabota.ru']='iframe,noindex';
	sites['raiffeisen.ru']='.promo_block';
	sites['rambler.ru']='[class^="b_banner_"]';
	sites['rbc.ru']='[class*="banner"],[class*="Banner"],div[style*="width:100%;"],.whitebg,img[width="234"],div>object,td>object,a[href*="go?"],div[id^="magna"],div[class$="header"]';
	sites['rbcdaily.ru']='td>object,.bannerHead,.bannerRight,.bannerRight234x400,.bannerBottom,.bannerLeft,.notes';
	sites['readwriteweb.com']='#right_column_box';
	sites['record.pt']='#eyeDiv,.pub_noticias,#ultimas_noticias+table+table,#ultimas_noticias+table+table+table,a[href="http://twitter.com/jornal_record"],body>table:nth-of-type(4)>tbody>tr>td:nth-of-type(4)>table:last-of-type>tbody>tr>td:last-of-type>table:nth-of-type(4),#ultimas_noticias~iframe+table>tbody>tr:last-child>td>table:last-child,table[align="right"][width="348"],span[id*="ContentPlaceHolder1"]~table:nth-of-type(7),span[id*="ContentPlaceHolder1"]~table:nth-of-type(8),[width="325"][height="45"],body>table:nth-of-type(3)>tbody>tr:last-child>td>table:first-of-type>tbody>tr:last-child>td:nth-of-type(2),body>table:nth-of-type(3)>tbody>tr:last-child>td>table:first-of-type>tbody>tr:last-child>td:nth-of-type(3),body>table:nth-of-type(7)>tbody>tr>td:nth-of-type(4)>table>tbody>tr>td:nth-of-type(5)>table>tbody>tr>td>table>tbody>tr:nth-child(2)';
	sites['rian.ru']='.c_banners,.mbanner,#imports,#banners,.contextBanner';
	sites['runescape.com']='#tb';
	sites['rusactors.ru']='[id^="lx_"]';
	sites['salon.com']='#frame2_container>span,ul.article_tools_icons,.share_inset,#x10,#x14,#x15,#x70,x05,#Top,#Frame2,#Middle2,#x08,#Right3,#x04,#Right1,#Right2,#x50,#Bottom,#Bottom1,#Bottom2,#Bottom3';
	sites['satkurier.pl']='#bann';
	sites['sexnarod.ru']='#cat_bubble,#cat,iframe';
	sites['sherdog.net']='td[width="160"][valign="top"][align="left"]';
	sites['sitepoint.com']='.industrybrains,table.tborder.product,.ad99';
	sites['skyrock.com']='.pub300,.pub180';
	sites['slashdot.org']='#fad1,#fad2,#fad3,#fad4,#fad5,#fad6';
	sites['slovari.yandex.ru']='.block-lingvo>div[style="margin:1em 0"]';
	sites['smart60.ru']='td[valign="top"]>center>table,noindex,.newsbody';
	sites['softexia.com']='.side-border-left>p:first-of-type,.side-border-left>table[width="170"],.side-border-right>table[width="170"]';
	sites['spectator.org']='[class^="ui-dialog"],.col3-sub3';
	sites['sport1.de']='.werbung,.superbanner';
	sites['sport-express.ru']='iframe[src*="rb.sport-express.ru"],td[class="c3_shablon"],td[class="cr_shablon"]';
	sites['sports.ru']='.top-banner,.banner,.sports-begun';
	sites['sportsillustrated.cnn.com']='.prWrap';
	sites['sueddeutsche.de']='div.bannerSky,.bannermiddle,.bannermiddle2';
	sites['tapochek.net']='#PopWin'; 
	sites['t-online.de']='#tsrwh,#tlexbox,#vmsb,#vmsky'; 
	sites['techcrunch.com']='div[id^="google_flash"],div#bugs,div#vertical_ads,div#seesmic_widget,div#header_medrec,ul.sponsor_units,ul#site_supporters,#col2,#post_unit_medrec';
	sites['techradar.com']='#top_banner,#houseAd,#mpu,#skyscraperAd,#network_links,img[alt^="Future Publishing"]';
	sites['techrepublic.com']='iframe.bidwar,#regPop,#regFix';
	sites['telegraph.co.uk']='#tmglBody>.oneThird>.summaryMedium>.headerThree,#tmglBody>.oneThird>.summaryMedium>.comPuff';
	sites['tfile.ru']='#top_ban';
	sites['tgdaily.com']='iframe[src^="http://shops."],.moduletable+div+.moduletable+.moduletable~*,#commentTools';
	sites['themarker.com']='[id^="dclk_"],[src*="/banners/"],[name^="neto_frame"],#flashad,#dcPlazma,#top_banners,#themarker';
	sites['thenextweb.com']='.lsidebar+.rsidebar+.usidebar *';
	sites['thepiratebay.org']='#topright,a[href*="facebook"],a[href*="ourtoolbar"],div[align="center"][style="color: rgb(123, 82, 57); font-family: Verdana,Arial,Helvetica; font-style: normal; font-variant: normal; font-weight: bold; font-size: 11px; line-height: normal; font-size-adjust: none; font-stretch: normal;"]';
	sites['tomshardware.com']='.advertRight,#advertRight,.shoppingBox,#header-advert,#outside-advert';
	sites['torrentfreak.com']='#sidebar_wrapper img[width="270"][height="90"],a[title^="Support"],#sidebar_wrapper>h3:last-of-type,#sidebar_wrapper>div:last-of-type,#siderightcol+div+div+br,#siderightcol+div+div+br+div+br,#siderightcol+div+div+br+div+br+div+br,#siderightcol+div+div+br+div+br+div+br+div+br';
	sites['torrents.ru']='div[style="padding: 8px 0 0;"],[class="tCenter"][class="bCenter"],#it-top,iframe';
	sites['totalcar.hu']='#services';
	sites['tracker.freeexchange.ru']='iframe[src^="http://smi2.ru/data/js/"],#lx_504';
	sites['tutu.ru']='iframe,td[style="height:90px;"],.plink';
	sites['tv.yandex.ru']='table[class="topLnk"]>tbody>tr[valign="bottom"]>td[colspan="3"]';
	sites['tv2.dk']='[id^="com-dropspot"],#tv2contentsquare,div[id="content-tvtid"][class="con-4"]>div[class~="com-rektangel-forsid"][class~="col-4"]';
	sites['uol.com.br']='div[id^="banner"],div[id^="mod-shopping"],div[id^="shop"],div[id^="to"],a[href*="event.ng"]';
	sites['utro.ru']='table[width="100%"]>tbody>tr>td[colspan="3"]>div[align="center"],div[id*="y5_direct"],div[id^="magna"],div[class^="banner"]';
	sites['vbeta.pl']='#blomedia_news';
	sites['veggieboards.com']='div.page:nth-of-type(1) div:first-child center:first-child';
	sites['vedomosti.ru']='[src*="adv.vedomosti.ru],iframe';
	sites['vsa-nova.com']='table>tbody>tr>td>a>img,div.smallfont>a>img';
	sites['walla.co.il']='iframe[src*="adf.cgi"],[id^="top_ad"]';
	sites['washingtonpost.com']='#banner_wrapper_top,#adTiff,#wrapperMainRight';
	sites['webhostingtalk.com']='div#identity>div.container>div.controls>div.powered,div#content>div.container.single>div#leaderboard.advertisement,div#content>div.container.single>div#primary>div>div.page>div>table>tbody>tr>td>table.tborder>tbody>tr>td.vbsociable,div#resources>div.container>div.advertisement>p[style],div.container>div#sponsored,div.container>div#footerad,div#content>div.container.single>div#promotion,div.container>div#sponsored-clear,div#content>div.container.single>div#primary>div>div.page>div>table>tbody>tr>td>table.tborder>tbody>tr>td.alt1>script,div#content>div.container.single>div#primary>div>div.page>div>table>tbody>tr>td>table.tborder>tbody>tr>td.alt1>a[target="_blank"],div#content>div.container.single>div#primary>div>div.page>div>table>tbody>tr>td>table.tborder>tbody>tr>td script,div#content>div.container.single>div#primary>div>div.page>div>table>tbody>tr>td>table.tborder>tbody>tr>td embed,div#content>div.container.single>div#primary>div>div.page>div>table>tbody>tr>td>table.tborder>tbody>tr>td img,div[id^="DIV_"][style*="position: absolute"][style*="z-index: 999999"][style*="top: 0px"]';
	sites['wetter.com']='#PX3_BOX_PARENT,#spox_box,#box-n24,[id^="RT"],#box-b_ad0-bleft,[id^="box-openad"],[src*="billabong"]';
	sites['windowssecrets.com']='table[summary="Ads"]';
	sites['wired.com']='#blogs_rightRail_A,#leaderboard,#blog_subscription_unit';
	sites['yahoo.com']='#sponsored-links,a[href*="thebestlife.com"],.ad_sidebar,.ad-links,.ad_slug_table,div[id^="dynamic-ad"],#marketplace,#smallbiz,div[id="nwPane"],div[id="swPane"]';
	sites['yandex.ru']='.banner-left,.somebanner,.some-banner,.b-banner';
	sites['ynet.co.il']='div[id*="ads"],#MarketSchedDiv';
	sites['youtube.com']='#side-announcement-box,#chrome-promo,#watch-channel-brand-div';
	sites['zaycev.net']='iframe,#ibp,[id^="tx2_"],tr>td[colspan="3"]>center>a';
	sites['zoneofgames.ru']='#FlashDiv,.buy';
	//sites['example.com']='';
	
	// Remove specific selectors from common ad patterns for specific sites. If you have a site that generates a false positive, add it here. Separate by commas.
	var css_exceptions=new Array();
	css_exceptions['afterdawn.com']='[class^="ad_"]';
	css_exceptions['apple.com/getamac/ads']='#ads,[id^="ad-"],[id^="ads-"]';
	css_exceptions['bbc.co.uk']='[class*="Advert"]';
	css_exceptions['betanews.com']='[class^="ad_"]';
	css_exceptions['chromestory.com']='[class*="-ad-"]';
	css_exceptions['cleacuisine.fr']='embed[width="250"][height="250"]';
	css_exceptions['collegehumor.com']='[class^="ad_"]';
	css_exceptions['commentcamarche.net']='[width="120"][height="60"]';
	css_exceptions['computerbase.de']='[class*="skyscraper"]';
	css_exceptions['comunio.de']='[style*="300px"][style*="250px"]';
	css_exceptions['dailymail.co.uk']='[class*="advert"]';
	css_exceptions['dailykos.com']='.ads';
	css_exceptions['daniweb.com']='[class^="ad_"]';
	css_exceptions['demonoid.com']='[class*="adbrite"]';
	css_exceptions['ebay.']='[id^="adv_"],[class^="adv_"]';
	css_exceptions['filmweb.pl']='[class*="Advert"],[id*="Advert"]';
	css_exceptions['flyertalk.com']='[id$="_Ads"]';
	css_exceptions['fusednetwork.com']='[id*="_adv_"],[id$="_adv"]';
	css_exceptions['gamefaqs.com']='[id^="mpu"]';
	css_exceptions['gamespot.com']='[id^="mpu"]';
	css_exceptions['gaiaonline.com']='[class$="_ad"]';
	css_exceptions['gazeta.pl']='[href*="campaign"][target="_blank"]';
	css_exceptions['google.com/finance']='[class$="-ads"]';
	css_exceptions['google.com/reader']='[href*="campaign"][target="_blank"],[href*="promotion"][target="_blank"],[href*="partner"][target="_blank"]';
	css_exceptions['google.com/uds/modules/elements/newsshow']='[width="728"][height="90"],[style*="728px"][style*="90px"]';
	css_exceptions['guloggratis.dk']='[class*="_ad_"],[class^="ad_"],[class^="ad-"],[class$="_ads"],[class*="_ads_"],[style*="728px"][style*="90px"]';
	css_exceptions['gumtree.co.za']='[id^="ad-"],[class^="ad-"]';
	css_exceptions['habrahabr.ru']='[id$="-adv"]';
	css_exceptions['hyves.nl']='[id*="skyscraper"]';
	css_exceptions['idnes.cz']='[class*="adword"],[class*="Advert"],[class*="advert"]';
	css_exceptions['japan.cnet.com']='[id^="ad_"]';
	css_exceptions['jpgmag.com']='[class$="Ad"]';
	css_exceptions['kafan.cn']='[href*="promotion"][target="_blank"]';
	css_exceptions['kijiji.']='.ad,[id^="ad-"],[class^="ad-"],[width="120"][height="60"]';
	css_exceptions['knowmark.ca']='[width="728"][height="90"]';
	css_exceptions['latimes.com']='[class*="skyscraper"]';
	css_exceptions['leboncoin.fr']='[class^="ad_"],[class*="adsense"]';
	css_exceptions['live.xbox.com']='[id^="ad_"]';
	css_exceptions['lyricwiki.org']='[class$="-ads"]';
	css_exceptions['marktplaats.nl']='[id*="advert"],[class^="ad_"],a[href*="/ads/"]';
	css_exceptions['mykawartha.com']='a[href*="/ads/"],a[href*="/ad/"],img[src*="/ad/"]';
	css_exceptions['nasdaq.com']='[id$="_ads"]';
	css_exceptions['newzleech.com']='#adv';
	css_exceptions['ntvplus.ru']='[class$="ad"]';
	css_exceptions['pcwelt.de']='a[href*="doubleclick.net"],a[href^="http://ad."],[class^="ad_"]';
	css_exceptions['photobucket.com']='[id$="Ad"],[class$="Ad"]';
	css_exceptions['physorg.com']='[class$="-ads"],.box-ads';
	css_exceptions['praca.gazetapraca.pl']='[id$="_adv"]';
	css_exceptions['pravda.sk']='[class*="adword"]';
	css_exceptions['priceminister.com']='[id*="advert"]';
	css_exceptions['realestate.com.au']='[class$="Ad"],a[href*="adclick"]';
	css_exceptions['salon.com']='.ads,[class^="ad_"]';
	css_exceptions['search.php']='[id$="_adv"]';
	css_exceptions['songza.com']='[width="300"][height="250"],[style*="300px"][style*="250px"]';
	css_exceptions['tab4u.com']='[id$="_ad"]';
	css_exceptions['tetrisfriends.com']='[id*="_ad_"]';
	css_exceptions['tieba.baidu.com']='[id*="_ad_"]';
	css_exceptions['trademe.co.nz']='[id$="Ad"]';
	css_exceptions['tv.com']='[id^="mpu"]';
	css_exceptions['ubuntu.com']='[width="180"][height="150"]';
	css_exceptions['viamichelin']='[style*="300px"][style*="100px"]';
	css_exceptions['vkontakte.ru']='[class$="Ad"]';
	css_exceptions['webhosting.pl']='[id^="ad_"]';
	css_exceptions['wp-admin']='iframe[src*="-ad"]';
	css_exceptions['wp-includes']='[id^="adv_"]';
	css_exceptions['wretch.cc']='[id^="ad_"]';
	css_exceptions['yota.ru']='[id*="advert"]';
	css_exceptions['zooppa.com']='[id^="ads-"],[id$="-ads"],[id^="ad-"],[id$="-ad"],[class^="ad-"],#ad,a[href*="/ads/"],[href*="/ads-"]';
	//css_exceptions['example.com']='';

	// Add custom CSS code to specific sites. Separate statements by ", " if more than one.
	var sites_custom_css=new Array();
	sites_custom_css['answers.com']='#pageWrapper{border:1px solid White !important}, #Top{border-bottom:10px solid White !important;}';
	sites_custom_css['betanews.com']='.most_commented{width:auto!important;margin:0!important;}';
	sites_custom_css['dailymail.co.uk']='.page-banner{padding-top:0!important;}, .beta .search{margin-bottom:.5em!important;}';
	sites_custom_css['drive.ru']='#ad480-wrapper td:nth-of-type(2){width:100% !important; height:90px !important;}, #ad480-wrapper table td {background:#666 !important;text-align:center;font-size:.8em !important;}';
	sites_custom_css['flyertalk.com']='div[style*="margin-right:166px"]{margin-right:0 !important}';
	sites_custom_css['facebook.com']='#right_column{float:left !important; margin-left:15px !important}, .profile_two_columns .right_column {width:720px!important}';
	sites_custom_css['groups.google.com']='button[type="button"]{cursor:pointer}';
	sites_custom_css['guloggratis.dk']='#center_col,#center_col>*{width:100% !important;}, form[name="BBBannersearch728"]{background:#fff}, form[name="BBBannersearch728"]>table{margin:auto !important}';
	sites_custom_css['iwiw.hu']='#content{width:auto !important; margin-right:10px;}';
	sites_custom_css['nationwide.co.uk']='#promo-container{height:100px}';
	sites_custom_css['pcwelt.de']='#head_position_absolute{position:relative;top:0;left:6px}';
	sites_custom_css['record.pt']='body>table:nth-of-type(3)>tbody>tr:last-child>td>table:first-of-type>tbody>tr:last-child>td:first-child{width:100%!important}';
	sites_custom_css['rian.ru']='#content{width:auto !important;}';
	sites_custom_css['techcrunch.com']='#col1{width:auto; margin-right:5px;}, #post_unit_posts_box{width:100%;border:0;}, #header_features a.feature{ margin: 1px 0 0 1px !important;width:33% !important; text-align:center; }';
	sites_custom_css['translate.opera.com']='body{font:12px Verdana,Liberty Sans,sans-serif!important}';
	sites_custom_css['washingtonpost.com']='#wrapperMainCenter{width:auto!important;padding-right:20px!important;}';
	sites_custom_css['wired.com']='#header{background:#000}';
	//sites_custom_css['example.com']='';

	// Common ad patterns
	var common_ad_patterns = '.bannerad,#bannerad,.ad,.Ad,.ads,.Ads,.ad1,.ad2,.ad3,.ad4,.ad5,.ad6,.ad7,.ad8,.ad9,.ad10,.Ad1,.Ad2,.Ad3,.Ad4,.Ad5,.Ad6,.Ad7,.Ad8,.Ad9,.Ad10,[class^="ad-"],[class^="Ad-"],[class^="ads-"],[class^="Ads-"],[class*="skyscraper"],[class*="advert"],[class*="adsense"],[class*="Adsense"],[class*="AdSense"],[class*="adword"],[class*="Adword"],[class*="AdWord"],[class*="Advert"],[class^="ad_"],[class^="Ad_"],[class^="ads_"],[class^="Ads_"],[class$="-ad"],[class$="-Ad"],[class$="-ads"],[class$="-Ads"],[class$="_ad"],[class$="_Ad"],[class$="_ads"],[class$="_Ads"],[class~="ad"],[class~="Ad"],#ad,#Ad,#ads,#Ads,#ad1,#ad2,#ad3,#ad4,#ad5,#ad6,#ad7,#ad8,#ad9,#ad10,#Ad1,#Ad2,#Ad3,#Ad4,#Ad5,#Ad6,#Ad7,#Ad8,#Ad9,#Ad10,[id^="fm_delivery_frame"],[id^="ad-"],[id^="Ad-"],[id^="ads-"],[id^="Ads-"],[id*="advert"],[id*="Advert"],[id^="ad_"],[id^="Ad_"],[id^="ads_"],[id^="Ads_"],[id$="-ad"],[id*="adsense"],[id*="skyscraper"],[id*="Adsense"],[id*="AdSense"],[id$="-Ad"],[id$="-ads"],[id$="-Ads"],[id$="_ad"],[id$="_Ad"],[id$="_ads"],[id$="_Ads"],a[href^="http://ads."],a[href^="http://ad."],a[href*="pheedo.com/click"],a[href*="feedads.googleadservices.com"],a[href*=".snap.com"],a[href*="doubleclick.net"],a[href*="click.adbrite.com"],a[href*="adbrite.com/mb/commerce"],a[href*="projectwonderful.com"],a[href*="googlesyndication.com/pagead"],a[href*="phpAds"],a[href*="phpads"],a[href^="http://services.google.com/feedback/abg"],a[href*="/ads/"],a[href*="/Ads/"],a[href*="/ad/"],a[href*="/Ad/"],[href*="fmpub.net"],[src*="googlesyndication.com/pagead"],[src*="fmpub.net"],[src^="http://ads."],[src^="http://ad."],[src*="doubleclick"],iframe[src*="ads"],iframe[src*="ad-"],iframe[src*="-ad"],iframe[name*="ads"],iframe[name*="ad-"],iframe[name*="-ad"],iframe[src*="advert"],iframe[src*="pagead"],iframe[name*="google"]:not([name="googleSearchFrame"]),iframe[src^="http://bwp."],iframe[href*="/ads/"],iframe[href*="/Ads/"],iframe[href*="/ad/"],iframe[href*="/Ad/"],img[href*="/ads/"],img[href*="/Ads/"],img[src*="/ad/"],img[src*="/Ad/"],[width="88"][height="31"],[style*="88px"][style*="31px"],[width="120"][height="240"],[style*="120px"][style*="240px"],[width="120"][height="580"],[style*="120px"][style*="580px"],[width="120"][height="600"],[style*="120px"][style*="600px"],[width="125"][height="600"],[style*="125px"][style*="600px"],[width="125"][height="125"],[width="160"][height="580"],[style*="160px"][style*="580px"],[width="160"][height="600"],[style*="160px"][style*="600px"],[width="180"][height="150"],[style*="180px"][style*="150px"],[width="234"][height="60"],[style*="234px"][style*="60px"],[width="240"][height="400"],[style*="240px"][style*="400px"],[width="250"][height="240"],[style*="250px"][style*="240px"],a[target="_blank"][width="250"][height="250"],a[target="_blank"][style*="250px"],embed[width="250"][height="250"],object[width="250"][height="250"],embed[style*="250px"],object[style*="250px"],[width="300"][height="238"],[style*="300px"][style*="238px"],[width="300"][height="250"],[style*="300px"][style*="250px"],[width="300"][height="600"],[width="336"][height="270"],[style*="336px"][style*="270px"],[style*="336px"][style*="280px"],[width="336"][height="280"],[style*="336px"][style*="280px"],[style*="336px"][style*="280px"],[width="468"][height="50"],[style*="468px"][style*="50px"],[width="468"][height="60"],[style*="468px"][style*="60px"],[width="720"][height="300"],[style*="720px"][style*="300px"],[width="728"][height="79"],[style*="728px"][style*="79px"],[width="728"][height="90"],[style*="728px"][style*="90px"],html>body>div#aus,div.ib_unit,div.ib_title,div[id$="divMonitorScript"],div[class~="RM_Container"],.box-ads,[src*="adocean"],[value*="adocean"],[id*="adocean"],[class*="adocean"],[class*="hirdetes"],[id*="hirdetes"],.adv,[class^="adv-"],[class^="adv_"],[class$="-adv"],[class$="_adv"],[class*="_adv_"],[class*="-adv-"],#adv,[id^="adv-"],[id^="adv_"],[id$="-adv"],[id$="_adv"],[id*="_adv_"],[id*="-adv-"],.topad,#topad,.bottomad,#bottomad,.leftad,#leftad,.rightad,#rightad,.googlead,#googlead,.googleads,#googleads,a[href*="adbureau"],[src*="adbureau"],a[href*="adclick"],[src*="adclick"],[class^="etarget"],[id^="etarget"],iframe[src*="etarget"],[id$="Ad"],[class$="Ad"],a[href*="/adx/"],[id*="google_ads"],[id*="google-ads"],[id*="googleads"],[id*="Google_Ads"],[id*="GoogleAds"],[id*="Google-Ads"],[class*="google_ads"],[class*="google-ads"],[class*="googleads"],[class*="Google_Ads"],[class*="GoogleAds"],[class*="Google-Ads"],[id^="adserv"],[class^="adserv"],[href^="http://adserv"],[src^="http://adserv"],[id^="adspace"],[class^="adspace"],[href^="http://adspace"],[src^="http://adspace"],[id^="snap_com"],[id^="*googletextads"],[class*="googletextads"],[class^="adheader"],[id^="adheader"],[class^="adfooter"],[id^="adfooter"],span#iTt,[class*="-ad-"],[id*="-ad-"],[class*="-ads-"],[id*="-ads-"],[class*="_ad_"],[id*="_ad_"],[class*="_ads_"],[id*="_ads_"],[class*="_Ads_"],[id*="_Ads_"],[height="850"][width="336"],[style*="850px"][style*="336px"],[href="adimpact.com"],a[href^="http://www.giganews.com/?a="],[href*="/click/"][target="_blank"],[href*="clk.tradedoubler.com"],[src*="clk.tradedoubler.com"],[href*="serve.ambercoastcasino.com"],[src*="bet365affiliates.com"],[src*="pub.betclick.com"],[href*="pub.betclick.com"],.listlight.promobg,[class*="nsoredlinks"],[class*="nsored-links"],[class*="nsored_links"],[id*="nsoredlinks"],[id*="nsored-links"],[id*="nsored_links"],[class*="partnerlinks"],[class*="partner-links"],[class*="partner_links"],[id*="partnerlinks"],[id*="partner-links"],[id*="partner_links"],[id$="_ads2"],[id$="-ads2"],[class$="_ads2"],[class$="-ads2"],.oio,#oio,[class^="oio"],[id^="oio"],[href*="/oiopub-"],[href*="smartadserver.com/call"],[id*="SmartLink"],[class*="SmartLink"],[id*="smartlink"],[class*="smartlink"],[href*="smartad"],[src*="smartad"],[class*="smartad"],[class*="SmartAd"],[id*="smartad"],[id*="SmartAd"],[src*="/ads/"],[src*="/Ads/"],[id*="adspot"],[class*="adspot"],[href^="http://cache.blogads.com"],[src^="http://cache.blogads.com"],[class*="eminimalls"],[id*="eminimalls"],[class*="chitika"],[id*="chitika"],[src^="http://mm.chitika.net/minimall"],iframe[width="468"][height="90"],[class*="promotional"],[id*="promotional"],[href*="campaign"][target="_blank"],[href*="Campaign"][target="_blank"],[href*="promotion"][target="_blank"],[href*="campaign"][target="_blank"],[href*="Promotion"][target="_blank"],[href*="partner"][target="_blank"],[href*="Partner"][target="_blank"],[id*="AdBrite"],[id*="adbrite"],[class*="AdBrite"],[class*="adbrite"],.adbottom,.AdBottom,#adbottom,#AdBottom,.adtop,.AdTop,#adtop,#AdTop,[href*="quantcast"],[src*="quantcast"],[href*="quantserve"],[src*="quantserve"],[class*="_Ad_"],[id*="_Ad_"],[class^="mpu"],[id^="mpu"],[class$="_mpu"],[id$="_mpu"],[class$="-mpu"],[id$="-mpu"],.adHolder,#adHolder,.adholder,#adholder,[href*="bdv_ref.dbm"],[href*="widgetbucks.com/home.page?referrer"],#Ad160x600,#Ad728x90,#adrotator,.adrotator,#Adrotator,.Adrotator,#AdRotator,.AdRotator,#ABMbanner,.ABMbanner,iframe[name*="google_ads"],[src*="abmw.aspx"],.adarea,.adsarea,#adarea,#adsarea,iframe[src*="adunitid"],[href*=".addthis.com/bookmark."],[href*="channel.pangora.com"],[class*="reklam"],[class*="Reklam"],[id*="reklam"],[id*="Reklam"],[id*="sponzorovane"],[class*="sponzorovane"],[id*="sponsored_links"],[class*="sponsored_links"],[id*="sponsored-links"],[class*="sponsored-links"],[id*="sponsoredlinks"],[class*="sponsoredlinks"],[class^="adcolumn"],[id^="adcolumn"],.adcolumn,#adcolumn,[href*="servedby.advertising.com"],[src*="servedby.advertising.com"],[id^="y5_"],[id^="MarketGid"],[id^="begun"],.headerad,.HeaderAd,.headerAd,#headerad,#HeaderAd,#headerAd,[href*="/adlink/"],[href^="http://adserver.adtechus.com"],[src*="engine.rorer.ru"],[src*="begun.ru"],[src*="sape.ru/r"],[src*="advmaker.ru"],[href*="da.feedsportal.com"],[href^="http://medialand.relax.ru/reference"],[href*="atwola.com"],[src*="atwola.com"],[src*="247realmedia.com"],[href*="247realmedia.com"],[value*="247realmedia.com"],[src*="/adserver/"],[href*="/adserver/"],[src*="adform.net"],[href*="adform.net"],[value*="adform.net"],[href*="adtech.de"],[src*="adtech.de"],[value*="adtech.de"],[class^="OAS_"],[id^="OAS_"],[class$="_OAS"],[id$="_OAS"],[class^="OAS-"],[id^="OAS-"],[class$="-OAS"],[id$="-OAS"],[src*="/ad_"],[src*="/ads_"],[src*="/ad-"],[src*="/ads-"],[href*="/ad_"],[href*="/ads_"],[href*="/ad-"],[href*="/ads-"],[class*="ad728"],[id*="ad728"],[class*="alimama"],[src*="alimama"],[id*="alimama"],[name*="alimama"],[id*="googleAd"],[class*="googleAd"],[class^="adcontainer"],[id^="adcontainer"],[class^="adContainer"],[id^="adContainer"],[class^="AdContainer"],[id^="Adcontainer"],[class$="Ads"],[id$="Ads"],.smallad,.bigad,.largead,#smallad,#bigad,#largead,.ad300x250,#ad300x250,.ad728x90,#ad728x90,.ad468x60,#ad468x60,.ad234x60,#ad234x60,.ad125x125,#ad125x125,.ad120x600,#ad120x600,.ad160x600,#ad160x600,.ad180x150,#ad180x150,.ad120x240,#ad120x240,.ad200x200,#ad200x200,.ad250x250,#ad250x250,.ad336x280,#ad336x280,.ad120x90,#ad120x90,.ad160x90,#ad160x90,.ad180x90,#ad180x90,.ad200x90,#ad200x90,.ad468x15,#ad468x15,.ad728x15,#ad728x15,iframe[src*="farlex.com"],#webo_pub,[class~="Ad"],[class~="Ads"],[class~="Ads"],[class$="AdBox"],[id$="AdBox"]';

	// Patterns found in advertisement javascripts. We use these patterns to detect advertisement scripts and to abort them in Opera (src attribute and text content)
	var scriptSrcMatch = "atwola\.com|\.ad_utils\.|\/(a|A)ds\.js|\/adclick\/|contextweb|dinclinx|ADSAdClient|adsyndication|pagead2|doubleclick\.net|\.fmpub\.net\/zone|\/ad\/|\/Ad\/|\/ads\/|\/Ads\/|\/adserver|bidvertiser|adbrite|http:\/\/ad\.|http:\/\/ads\.|http:\/\/adserver\.|http:\/\/adfarm\.|http:\/\/aj\.|realmatch\.com|\.snap\.com|industrybrains|hirdetes|adserving|infolinks|adbrite|chitika|kontera|pagead|smartad|adjuggler|atdmt|intellitxt|quantcast|quantserve|adocean|-ad\/|-ads\/|_ad\/|_ads\/|-Ad\/|-Ads\/|_Ad\/|_Ads\/|\/ad-|\/ads-|\/ad_|\/ads_|\/Ad-|\/Ads-|\/Ad_|\/Ads_|247realmedia\.com|adform\.net|adtech\.de";
	var scriptTxtMatch = "contextweb|google_ad(s|_)|Advertise|alimama_pid|addthis_pub|_adprod|AdLinkColor|microsoft_adunitid|phpAds|condenetads|bdv_ref_pid|ib_title|AdBrite|adbrite|Adbrite|ch_type|ch_client|realmatch|industrybrains|hirdetes|adserving|infolinks|adbrite|chitika|kontera|smartad|adjuggler|atdmt|intellitxt|quantcast|quantserve|adocean|OAS_AD|OASd|openads_|ADTECH_AD";
	
	// List of exceptions for Javascript src-matching patterns in Opera. Add RegExps here if false positive, separate by ', '
	var scriptSrcMatchExceptions=new Array();
	scriptSrcMatchExceptions['gamingunion.net']='|http:\/\/aj\.';
	scriptSrcMatchExceptions['stern.de']='|doubleclick\.net, |http:\/\/ad\.';
	scriptSrcMatchExceptions['tetrisfriends.com']='|\/(a|A)ds\.js';
	scriptSrcMatchExceptions['twitter.com']='|http:\/\/aj\.';
	scriptSrcMatchExceptions['ldlc.']='A)ds\.js';

	// Same as above for Javascript text-match patterns
	var scriptTxtMatchExceptions=new Array();
	scriptTxtMatchExceptions['digg.com']='|atdmt';
	scriptTxtMatchExceptions['facebook.com']='|ch_type';
	scriptTxtMatchExceptions['joost.com']='|Advertise';
	scriptTxtMatchExceptions['last.fm']='|atdmt';
	scriptTxtMatchExceptions['lifehacker.com']='|google_ad(s|_)';
	scriptTxtMatchExceptions['tetrisfriends.com']='|OAS_AD, |OASd';
	scriptTxtMatchExceptions['theonion.com']='|google_ad(s|_)';
	scriptTxtMatchExceptions['torrentleech.org']='|ch_type';

	// AdSweep functions
	
	function removeCSSSelector(myStr, mySubstr){
		myStr = "," + myStr + ",";
		myStr = myStr.split("," + mySubstr + ",").join(",");
		myStr = myStr.substring(1, myStr.length-1);
		return myStr;
	}
	function removeCSSSelector_bkp(myStr, mySubstr){
		myStr=myStr.split(",");
		for(a in myStr){
			if(myStr[a].match(mySubstr)){
				myStr.splice(a,1);
			}
		}
		myStr=myStr.join(",");
		return myStr;
	}
	// Continue execution or stop if URL is whitelisted
	window.whitelistFlag = false;
	for(var i in whitelist){
		// If the URL is in the whitelist
		if(URL.match(whitelist[i])){
			whitelistFlag = true;
			break;
		} else {
			whitelistFlag=false;	
		}
	}
	if(whitelistFlag==false){
		// Store all CSS rules into an array
		var css_rules = new Array();
		
		// Variable to hide common ad patterns or not
		window.hide_common_ads = true;
		
		// Hide common ad patterns or not?
		for(var e in adPatternExceptions){
			// If the URL is in the list of exception web sites
			if(URL.indexOf(adPatternExceptions[e])!=-1){
				hide_common_ads = false;
				break;
			}
		}
		if(hide_common_ads==true){
			// Remove CSS selectors listed in the exception list for a specific web site
			for(var b in css_exceptions){
				if(URL.indexOf(b)!=-1){
					var css_exception_tags = css_exceptions[b].split(',');
					for(var c in css_exception_tags){
						common_ad_patterns = removeCSSSelector(common_ad_patterns, css_exception_tags[c]);
					}
				}
			}
			// Add common ad patterns to the CSS rules
			css_rules['hide_common_ads'] = common_ad_patterns + '{display:none !important;height:0px !important;width:0px !important;}';
	
			// Remove styling from notorious inline ads until they are removed
			css_rules['remove_ad_styling'] = 'span.IL_LINK_STYLE{border:0!important;color:inherit!important;text-decoration:inherit!important;font-weight:inherit!important;font-family:inherit!important;}';
	
			// Abort advertisement javascripts in Opera
			if(ua.match("Opera")){
				// Remove exceptions if any			
				for(var a in scriptSrcMatchExceptions){
					if(URL.match(a)){
						var scriptSrcMatchExceptionsTags = scriptSrcMatchExceptions[a].split(', ');
						for(var b in scriptSrcMatchExceptionsTags){
							scriptSrcMatch = scriptSrcMatch.replace(scriptSrcMatchExceptionsTags[b], '');
						}
					}
				}
				for(var a in scriptTxtMatchExceptions){
					if(URL.match(a)){
						var scriptTxtMatchExceptionsTags = scriptTxtMatchExceptions[a].split(', ');
						for(var b in scriptTxtMatchExceptionsTags){
							scriptTxtMatch = scriptTxtMatch.replace(scriptTxtMatchExceptionsTags[b], '');
						}
					}
				}
				
				
				window.opera.addEventListener(
					'BeforeExternalScript',
					function(e) {
						if(e.element.src){
							if(e.element.getAttribute('src').match(scriptSrcMatch)){
								e.preventDefault();
							}
						}
					},
					false
				);
				window.opera.addEventListener(
					'BeforeScript',
					function(e) {
						if(e.element.text){
							if(e.element.text.match(scriptTxtMatch)){
								e.preventDefault();
							}
						}
					},
					false
				);
			}
		}
	
		// Add custom objects to hide to CSS rules, based on the URL
		for(var i in sites){
			if(URL.indexOf(i)!=-1){
				css_rules['sites'] = sites[i]+'{display:none !important;height:0px !important;width:0px !important;}';
				break;
			}
		}
	
		// Add custom CSS code to CSS rules, based on the URL
		for(var j in sites_custom_css){
			if(URL.indexOf(j)!=-1){
				var site_custom_css_rules = sites_custom_css[j].split(", ");
				for (var k=0; k<site_custom_css_rules.length; k++) {
					css_rules[k] = site_custom_css_rules[k];
				}
				break;
			}
		}
		
		// Inject all CSS rules into the page
		var style = document.createElement("style");
		document.getElementsByTagName("head")[0].appendChild(style);
		var sheet = style.sheet;
		for(var k in css_rules){
			sheet.insertRule(css_rules[k],sheet.cssRules.length);
		}
	
	}
}
function adsweep_removeAdNodes()
{
	adsweep_YouTube();
	window.setTimeout(function()
	{		
		// AdBrite
		if(document.getElementsByTagName("A")){var anchorTags=document.getElementsByTagName("A");for(var a=0;a<anchorTags.length;a++){for(var x=0;x<anchorTags[a].attributes.length;x++){if(anchorTags[a].attributes[x].nodeName.toLowerCase()=='id'){if(anchorTags[a].attributes[x].nodeValue.indexOf("AdBriteInlineAd")!=-1){var textString=anchorTags[a].innerHTML;var newNode=document.createElement('SPAN');newNode.innerHTML=textString;anchorTags[a].parentNode.insertBefore(newNode,anchorTags[a]);}}}}}
		
		// Infolinks
		if(document.getElementsByTagName("SPAN")){var spanTags=document.getElementsByTagName("SPAN");for(var a=0;a<spanTags.length;a++){for(var x=0;x<spanTags[a].attributes.length;x++){if(spanTags[a].attributes[x].nodeName.toLowerCase()=='class'){if(spanTags[a].attributes[x].nodeValue=='IL_LINK_STYLE'){var textString=spanTags[a].innerHTML;var newNode=document.createElement('LABEL');newNode.innerHTML=textString;spanTags[a].parentNode.insertBefore(newNode,spanTags[a]);spanTags[a].parentNode.removeChild(spanTags[a]);}}}}}
	
		// Kontera
		if(document.getElementsByTagName("A")){var anchorTags=document.getElementsByTagName("A");for(var a=0;a<anchorTags.length;a++){for(var x=0;x<anchorTags[a].attributes.length;x++){if(anchorTags[a].attributes[x].nodeName.toLowerCase()=='class') {if(anchorTags[a].attributes[x].nodeValue=='kLink'){var textString=anchorTags[a].childNodes[0].childNodes[0].innerHTML;var newNode=document.createElement('SPAN');newNode.innerHTML=textString;anchorTags[a].parentNode.insertBefore(newNode,anchorTags[a]);anchorTags[a].parentNode.removeChild(anchorTags[a]);}}}}}
	
		// VibrantMedia
		if(document.getElementsByTagName("A")){var anchorTags=document.getElementsByTagName("A");for(var a=0;a<anchorTags.length;a++){for(var x=0;x<anchorTags[a].attributes.length;x++){if(anchorTags[a].attributes[x].nodeName.toLowerCase()=='class') {if(anchorTags[a].attributes[x].nodeValue=='iAs'){var textString=anchorTags[a].innerHTML;var newNode=document.createElement('SPAN');newNode.innerHTML=textString;anchorTags[a].parentNode.insertBefore(newNode,anchorTags[a]);anchorTags[a].parentNode.removeChild(anchorTags[a]);}}}}}
	},50);
	
		// Hide content using Javascript on specific sites once the page is loaded
	
		if(URL.match("distrowatch.com")){ if(document.getElementsByTagName("TABLE")){ if(document.getElementsByTagName("TABLE")[0].nextSibling){ if(document.getElementsByTagName("TABLE")[0].nextSibling.nextSibling){ var tbTag=document.getElementsByTagName("TABLE")[0].nextSibling.nextSibling; if(tbTag.innerHTML){ if(tbTag.innerHTML.match("pagead2")){ if(tbTag.tagName){ tbTag.style.display='none'; } } } } } } if(document.getElementsByTagName("TD")){ var tdTag=document.getElementsByTagName("TD"); for(a=0;a<tdTag.length;a++){ if(tdTag[a].innerHTML){ if(tdTag[a].innerHTML.match(/^Sponsored Message$|^???????????? ??????$|^????????? ?????$|^?????????? ???????????$|^Wiadomosc sponsorowana$|^Pesan Sponsor$|^?????? ????? ????$|^????$|^Remeju Žinute$|^?????? ?????$|^Sponzorji - sporocila$|^Gesponsord Bericht$|^Message de pub$|^Mensaje patrocinado$|^Sponsorennachricht$|^Sponsoroitu viesti$|^???????????? ?????????$|^????$|^Sponsorun Mesaji$|^Missatge patrocinat$|^???????? ??????$|^????µa ???????$|^???????????? ????????$|^Szponzorált üzenet$|^???? ?? ?????$|^Mensagem de Publicidade$|^Sponsoreeritud teade$|^Sponsoreret Besked$|^???? ????????$|^???????????? ????????????$|^Messaggio sponsorizzato$|^Sponzorske poruke$/)){ if(tdTag[a].parentNode){ if(tdTag[a].parentNode.parentNode){ if(tdTag[a].parentNode.parentNode.parentNode){ if(tdTag[a].parentNode.parentNode.parentNode.parentNode){ if(tdTag[a].parentNode.parentNode.parentNode.parentNode.parentNode){ var hideTag=tdTag[a].parentNode.parentNode.parentNode.parentNode.parentNode; if(hideTag.tagName){ hideTag.style.display='none'; } } } } } } } } } } if(document.getElementsByTagName("TH")){ var thTags=document.getElementsByTagName("TH"); for(a=0;a<thTags.length;a++){ if(thTags[a].innerHTML.match(/^Linux Netbooks$|^???????????$|^????????$|^Advertisement$|^??????????$|^Reklamy$|^Iklan$|^??????$|^??$|^Reklam$|^?????$|^Reklama$|^Advertentie$|^Oglaševanje$|^Advertisement$|^Anuncions$|^Annonce$|^Werbung$|^Mainos$|^Anunci$|^??af?µ?s?$|^Hirdetés$|^???????$|^??$|^Publicidade$|^????????$|^Reklaam$|^??????$|^?????????$|^Reklame$|^???????$|^???????$|^Pubblicità$|^Oglas$/)){ if(thTags[a].parentNode){ if(thTags[a].parentNode.parentNode){ var hideTag=thTags[a].parentNode.parentNode; if(hideTag.tagName){ hideTag.style.display='none'; } } } } } } if(document.getElementsByTagName("A")){ var aTags=document.getElementsByTagName("A"); for(var a=0;a<aTags.length;a++){ if(aTags[a].innerHTML.match(/vpslink|osdisc|3cx|Acunetix/)){ if(aTags[a].parentNode){ if(aTags[a].parentNode.parentNode){ if(aTags[a].parentNode.parentNode.parentNode){ if(aTags[a].parentNode.parentNode.parentNode.parentNode){ var hideTag=aTags[a].parentNode.parentNode.parentNode.parentNode; if(hideTag.tagName){ hideTag.style.display='none'; } if(hideTag.nextSibling){ if(hideTag.nextSibling.nextSibling){ var hideTag2=hideTag.nextSibling.nextSibling; if(hideTag2.tagName){ hideTag2.style.display='none'; } } } } } } } } if(aTags[a].innerHTML){ if(aTags[a].innerHTML.match(/linuxidentity|linuxcd/)){ if(aTags[a].parentNode){ if(aTags[a].parentNode.parentNode){ if(aTags[a].parentNode.parentNode.parentNode){ if(aTags[a].parentNode.parentNode.parentNode.parentNode){ var hideTag=aTags[a].parentNode.parentNode.parentNode.parentNode; hideTag.style.display='none'; if(hideTag.nextSibling){ if(hideTag.nextSibling.tagName){ var hideTag2=hideTag.nextSibling; hideTag2.style.display='none'; } } } } } } } } } } if(document.getElementsByTagName("FORM")){ var formTags=document.getElementsByTagName("FORM"); for(a=0;a<formTags.length;a++){ for(var x=0;x<formTags[a].attributes.length;x++){ if(formTags[a].attributes[x].nodeName.toLowerCase()=='name') { if(formTags[a].attributes[x].nodeValue=='Dataspan'){ if(formTags[a].parentNode){ if(formTags[a].parentNode.parentNode){ if(formTags[a].parentNode.parentNode.parentNode){ if(formTags[a].parentNode.parentNode.parentNode.parentNode){ if(formTags[a].parentNode.parentNode.parentNode.parentNode.previousSibling){ if(formTags[a].parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling){ hideTag=formTags[a].parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling; if(hideTag.tagName){ hideTag.style.display='none'; } } } } } } } } } } } } document.getElementsByTagName("BODY")[0].style.display='block'; }
		if(URL.match("forums.futura-sciences.com")){var nodes=document.getElementsByClassName("page");for(var i=0;i<nodes.length;i++){if(nodes[i].innerHTML){if(nodes[i].innerHTML.match('Liens sponsoris')){nodes[i].parentNode.removeChild(nodes[i]);}}} var nodes=document.getElementsByTagName("TD");for(var i=0;i<nodes.length;i++){if(nodes[i].innerHTML){if(nodes[i].innerHTML.match('Futura Sciences n\'est pas responsable du contenu de ces publicit')){var node=nodes[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("DIV")[0];node.parentNode.removeChild(node);}}}}
		if(URL.match("mashable.com")){if(document.getElementsByTagName("H3")){ var h3Tags=document.getElementsByTagName("H3"); for(var a=0;a<h3Tags.length;a++){ if(h3Tags[a].innerHTML=="Mashable Partners"){ var hideElement=h3Tags[a].parentNode.parentNode; hideElement.parentNode.removeChild(hideElement); } } } if(document.getElementsByTagName("H3")){ var h3Tags=document.getElementsByTagName("H3"); for(var a=0;a<h3Tags.length;a++){ if(h3Tags[a].innerHTML=="Sun Startup Essentials"){ var hideElement=h3Tags[a].parentNode.parentNode; hideElement.parentNode.removeChild(hideElement); } } } if(document.getElementsByTagName("P")){ var pTags=document.getElementsByTagName("P"); for(var a=0;a<pTags.length;a++){ if(pTags[a].innerHTML=="Sponsored By:"){ pTags[a].parentNode.removeChild(pTags[a]); } } } if(document.getElementsByTagName("A")){ var aTags=document.getElementsByTagName("A"); for(var a=0;a<aTags.length;a++){ if(aTags[a].innerHTML=="Advertise Here"){ var hideElement=aTags[a].parentNode.parentNode.parentNode; hideElement.parentNode.removeChild(hideElement); } } } if(document.getElementsByTagName("STRONG")){ var strongTags=document.getElementsByTagName("STRONG"); for(var a=0;a<strongTags.length;a++){ if(strongTags[a].innerHTML=="Twitter Brand Sponsors"){ var hideElement=strongTags[a].parentNode.parentNode.parentNode.parentNode.parentNode; hideElement.parentNode.removeChild(hideElement);}}}}
		if(URL.match("my.opera.com/community/forums")){if(document.getElementsByClassName('fpost')){var posts = document.getElementsByClassName('fpost');for(var a=0;a<posts.length;a++){if(posts[a].innerHTML.match("882703")){$('content').removeChild(posts[a]);}}}}
		if(URL.match("pcwelt.de")){if(document.getElementsByTagName("A")){ var anchorTags=document.getElementsByTagName("A"); for(var a=0;a<anchorTags.length;a++){ if(anchorTags[a].innerHTML.match("mentasys")){ var hideTag=anchorTags[a].parentNode.parentNode.parentNode.parentNode.parentNode; hideTag.parentNode.removeChild(hideTag); } } } if(document.getElementsByTagName("SPAN")){ var sTags=document.getElementsByTagName("SPAN"); for(var a=0;a<sTags.length;a++){ if(sTags[a].innerHTML.match("Office Anwendung-Software")){ var hideTag=sTags[a].parentNode; hideTag.parentNode.removeChild(hideTag); } } } if(document.getElementsByTagName("SPAN")){ var sTags=document.getElementsByTagName("SPAN"); for(var a=0;a<sTags.length;a++){ if(sTags[a].innerHTML.match("Ligatus")){ var hideTag=sTags[a].parentNode; hideTag.parentNode.removeChild(hideTag); } } } if(document.getElementsByTagName("H1")){ var h1Tags=document.getElementsByTagName("H1"); for(var a=0;a<h1Tags.length;a++){ if(h1Tags[a].innerHTML.match(/^Ligatus/)){ var hideTag=h1Tags[a].parentNode.parentNode.parentNode.parentNode; hideTag.parentNode.removeChild(hideTag); } } } }
		if(URL.match("squidoo.com")){window.setTimeout(function(){if(document.getElementsByTagName("H2")){var hTags=document.getElementsByTagName("H2");for(var a=0;a<hTags.length;a++){if(hTags[a].innerHTML.match("Great Stuff on Amazon")){hTags[a].parentNode.parentNode.removeChild(hTags[a].parentNode);}}}},50);}
		if(URL.match(/lifehacker\.com\/$/m)){if(document.getElementsByTagName("link")){var tag=document.getElementsByTagName("link")[1];var tagC = tag.cloneNode(true);tagC.href="http://tags.lifehacker.com/assets/minify.php?files=/assets/g4.lifehacker.com/css/style.css";tag.parentNode.replaceChild(tagC, tag);}}
		if(URL.match("facepunch.com")){var body=document.getElementsByTagName("body")[1];var tag=body.getElementsByTagName("script")[0];if(tag.src="http://facepunchcom.skimlinks.com/api/skimlinks.js"){tag.parentNode.removeChild(tag);}}
}
function adsweep_YouTube(){
	// Hide YouTube ads, taken from http://userscripts.org/scripts/show/49366
	String.prototype.setVar = function(q, v) {
	var regex = new RegExp("([\&\?])?"+q+"=[^\&\#]*", "g");
	return regex.test(this) ? this.replace(regex, "$1"+q+"="+v) : this+"&"+q+"="+v;
	}

	var mp = document.getElementById("movie_player");
	if (mp)
	{
		var mpC = mp.cloneNode(true),
			regex = {
					ads:/[\&\?]?(ad_|infringe|invideo|watermark)([^=]*)?=[^\&]*/gi,
					begin_end:/(^[\&\?]*)|([\&\?]*$)/g
					},
			fv = mpC.getAttribute("flashvars").setVar("autoplay", "1").setVar("enablejsapi", "1");
		if(fv.search(regex["ads"]) != -1)
		{
			fv = fv.replace(regex["ads"],"")+"&invideo=false";
			mpC.setAttribute("flashvars", fv.replace(regex["begin_end"],""));
			mp.parentNode.replaceChild(mpC, mp);
		}
	}
}
})();
import * as WebIFC from "web-ifc";

export class IfcCategories {
	constructor(api) {
		this.api = api;
	}
	getAll(modelID) {
		const elementsCategories = {};
		const categoriesIDs = Object.keys(IfcElements).map((e) => parseInt(e, 10));

		for (let i = 0; i < categoriesIDs.length; i++) {
			const element = categoriesIDs[i];
			const lines = this.api.GetLineIDsWithType(modelID, element);
			const size = lines.size();
			for (let i = 0; i < size; i++) {
				elementsCategories[lines.get(i)] = element;
			}
		}

		return elementsCategories;
	}
}

export const IfcElements = {
	103090709: "IFCPROJECT",
	4097777520: "IFCSITE",
	4031249490: "IFCBUILDING",
	3124254112: "IFCBUILDINGSTOREY",
	3856911033: "IFCSPACE",
	1674181508: "IFCANNOTATION",
	25142252: "IFCCONTROLLER",
	32344328: "IFCBOILER",
	76236018: "IFCLAMP",
	90941305: "IFCPUMP",
	177149247: "IFCAIRTERMINALBOX",
	182646315: "IFCFLOWINSTRUMENT",
	263784265: "IFCFURNISHINGELEMENT",
	264262732: "IFCELECTRICGENERATOR",
	277319702: "IFCAUDIOVISUALAPPLIANCE",
	310824031: "IFCPIPEFITTING",
	331165859: "IFCSTAIR",
	342316401: "IFCDUCTFITTING",
	377706215: "IFCMECHANICALFASTENER",
	395920057: "IFCDOOR",
	402227799: "IFCELECTRICMOTOR",
	413509423: "IFCSYSTEMFURNITUREELEMENT",
	484807127: "IFCEVAPORATOR",
	486154966: "IFCWINDOWSTANDARDCASE",
	629592764: "IFCLIGHTFIXTURE",
	630975310: "IFCUNITARYCONTROLELEMENT",
	635142910: "IFCCABLECARRIERFITTING",
	639361253: "IFCCOIL",
	647756555: "IFCFASTENER",
	707683696: "IFCFLOWSTORAGEDEVICE",
	738039164: "IFCPROTECTIVEDEVICE",
	753842376: "IFCBEAM",
	812556717: "IFCTANK",
	819412036: "IFCFILTER",
	843113511: "IFCCOLUMN",
	862014818: "IFCELECTRICDISTRIBUTIONBOARD",
	900683007: "IFCFOOTING",
	905975707: "IFCCOLUMNSTANDARDCASE",
	926996030: "IFCVOIDINGFEATURE",
	979691226: "IFCREINFORCINGBAR",
	987401354: "IFCFLOWSEGMENT",
	1003880860: "IFCELECTRICTIMECONTROL",
	1051757585: "IFCCABLEFITTING",
	1052013943: "IFCDISTRIBUTIONCHAMBERELEMENT",
	1062813311: "IFCDISTRIBUTIONCONTROLELEMENT",
	1073191201: "IFCMEMBER",
	1095909175: "IFCBUILDINGELEMENTPROXY",
	1156407060: "IFCPLATESTANDARDCASE",
	1162798199: "IFCSWITCHINGDEVICE",
	1329646415: "IFCSHADINGDEVICE",
	1335981549: "IFCDISCRETEACCESSORY",
	1360408905: "IFCDUCTSILENCER",
	1404847402: "IFCSTACKTERMINAL",
	1426591983: "IFCFIRESUPPRESSIONTERMINAL",
	1437502449: "IFCMEDICALDEVICE",
	1509553395: "IFCFURNITURE",
	1529196076: "IFCSLAB",
	1620046519: "IFCTRANSPORTELEMENT",
	1634111441: "IFCAIRTERMINAL",
	1658829314: "IFCENERGYCONVERSIONDEVICE",
	1677625105: "IFCCIVILELEMENT",
	1687234759: "IFCPILE",
	1904799276: "IFCELECTRICAPPLIANCE",
	1911478936: "IFCMEMBERSTANDARDCASE",
	1945004755: "IFCDISTRIBUTIONELEMENT",
	1973544240: "IFCCOVERING",
	1999602285: "IFCSPACEHEATER",
	2016517767: "IFCROOF",
	2056796094: "IFCAIRTOAIRHEATRECOVERY",
	2058353004: "IFCFLOWCONTROLLER",
	2068733104: "IFCHUMIDIFIER",
	2176052936: "IFCJUNCTIONBOX",
	2188021234: "IFCFLOWMETER",
	2223149337: "IFCFLOWTERMINAL",
	2262370178: "IFCRAILING",
	2272882330: "IFCCONDENSER",
	2295281155: "IFCPROTECTIVEDEVICETRIPPINGUNIT",
	2320036040: "IFCREINFORCINGMESH",
	2347447852: "IFCTENDONANCHOR",
	2391383451: "IFCVIBRATIONISOLATOR",
	2391406946: "IFCWALL",
	2474470126: "IFCMOTORCONNECTION",
	2769231204: "IFCVIRTUALELEMENT",
	2814081492: "IFCENGINE",
	2906023776: "IFCBEAMSTANDARDCASE",
	2938176219: "IFCBURNER",
	2979338954: "IFCBUILDINGELEMENTPART",
	3024970846: "IFCRAMP",
	3026737570: "IFCTUBEBUNDLE",
	3027962421: "IFCSLABSTANDARDCASE",
	3040386961: "IFCDISTRIBUTIONFLOWELEMENT",
	3053780830: "IFCSANITARYTERMINAL",
	3079942009: "IFCOPENINGSTANDARDCASE",
	3087945054: "IFCALARM",
	3101698114: "IFCSURFACEFEATURE",
	3127900445: "IFCSLABELEMENTEDCASE",
	3132237377: "IFCFLOWMOVINGDEVICE",
	3171933400: "IFCPLATE",
	3221913625: "IFCCOMMUNICATIONSAPPLIANCE",
	3242481149: "IFCDOORSTANDARDCASE",
	3283111854: "IFCRAMPFLIGHT",
	3296154744: "IFCCHIMNEY",
	3304561284: "IFCWINDOW",
	3310460725: "IFCELECTRICFLOWSTORAGEDEVICE",
	3319311131: "IFCHEATEXCHANGER",
	3415622556: "IFCFAN",
	3420628829: "IFCSOLARDEVICE",
	3493046030: "IFCGEOGRAPHICELEMENT",
	3495092785: "IFCCURTAINWALL",
	3508470533: "IFCFLOWTREATMENTDEVICE",
	3512223829: "IFCWALLSTANDARDCASE",
	3518393246: "IFCDUCTSEGMENT",
	3571504051: "IFCCOMPRESSOR",
	3588315303: "IFCOPENINGELEMENT",
	3612865200: "IFCPIPESEGMENT",
	3640358203: "IFCCOOLINGTOWER",
	3651124850: "IFCPROJECTIONELEMENT",
	3694346114: "IFCOUTLET",
	3747195512: "IFCEVAPORATIVECOOLER",
	3758799889: "IFCCABLECARRIERSEGMENT",
	3824725483: "IFCTENDON",
	3825984169: "IFCTRANSFORMER",
	3902619387: "IFCCHILLER",
	4074379575: "IFCDAMPER",
	4086658281: "IFCSENSOR",
	4123344466: "IFCELEMENTASSEMBLY",
	4136498852: "IFCCOOLEDBEAM",
	4156078855: "IFCWALLELEMENTEDCASE",
	4175244083: "IFCINTERCEPTOR",
	4207607924: "IFCVALVE",
	4217484030: "IFCCABLESEGMENT",
	4237592921: "IFCWASTETERMINAL",
	4252922144: "IFCSTAIRFLIGHT",
	4278956645: "IFCFLOWFITTING",
	4288193352: "IFCACTUATOR",
	4292641817: "IFCUNITARYEQUIPMENT",
	3009204131: "IFCGRID",
};
export const IfcCategoryMap = {
	3821786052: "IFCACTIONREQUEST",
	2296667514: "IFCACTOR",
	3630933823: "IFCACTORROLE",
	4288193352: "IFCACTUATOR",
	2874132201: "IFCACTUATORTYPE",
	618182010: "IFCADDRESS",
	1635779807: "IFCADVANCEDBREP",
	2603310189: "IFCADVANCEDBREPWITHVOIDS",
	3406155212: "IFCADVANCEDFACE",
	1634111441: "IFCAIRTERMINAL",
	177149247: "IFCAIRTERMINALBOX",
	1411407467: "IFCAIRTERMINALBOXTYPE",
	3352864051: "IFCAIRTERMINALTYPE",
	2056796094: "IFCAIRTOAIRHEATRECOVERY",
	1871374353: "IFCAIRTOAIRHEATRECOVERYTYPE",
	3087945054: "IFCALARM",
	3001207471: "IFCALARMTYPE",
	325726236: "IFCALIGNMENT",
	749761778: "IFCALIGNMENT2DHORIZONTAL",
	3199563722: "IFCALIGNMENT2DHORIZONTALSEGMENT",
	2483840362: "IFCALIGNMENT2DSEGMENT",
	3379348081: "IFCALIGNMENT2DVERSEGCIRCULARARC",
	3239324667: "IFCALIGNMENT2DVERSEGLINE",
	4263986512: "IFCALIGNMENT2DVERSEGPARABOLICARC",
	53199957: "IFCALIGNMENT2DVERTICAL",
	2029264950: "IFCALIGNMENT2DVERTICALSEGMENT",
	3512275521: "IFCALIGNMENTCURVE",
	1674181508: "IFCANNOTATION",
	669184980: "IFCANNOTATIONFILLAREA",
	639542469: "IFCAPPLICATION",
	411424972: "IFCAPPLIEDVALUE",
	130549933: "IFCAPPROVAL",
	3869604511: "IFCAPPROVALRELATIONSHIP",
	3798115385: "IFCARBITRARYCLOSEDPROFILEDEF",
	1310608509: "IFCARBITRARYOPENPROFILEDEF",
	2705031697: "IFCARBITRARYPROFILEDEFWITHVOIDS",
	3460190687: "IFCASSET",
	3207858831: "IFCASYMMETRICISHAPEPROFILEDEF",
	277319702: "IFCAUDIOVISUALAPPLIANCE",
	1532957894: "IFCAUDIOVISUALAPPLIANCETYPE",
	4261334040: "IFCAXIS1PLACEMENT",
	3125803723: "IFCAXIS2PLACEMENT2D",
	2740243338: "IFCAXIS2PLACEMENT3D",
	1967976161: "IFCBSPLINECURVE",
	2461110595: "IFCBSPLINECURVEWITHKNOTS",
	2887950389: "IFCBSPLINESURFACE",
	167062518: "IFCBSPLINESURFACEWITHKNOTS",
	753842376: "IFCBEAM",
	2906023776: "IFCBEAMSTANDARDCASE",
	819618141: "IFCBEAMTYPE",
	4196446775: "IFCBEARING",
	3649138523: "IFCBEARINGTYPE",
	616511568: "IFCBLOBTEXTURE",
	1334484129: "IFCBLOCK",
	32344328: "IFCBOILER",
	231477066: "IFCBOILERTYPE",
	3649129432: "IFCBOOLEANCLIPPINGRESULT",
	2736907675: "IFCBOOLEANRESULT",
	4037036970: "IFCBOUNDARYCONDITION",
	1136057603: "IFCBOUNDARYCURVE",
	1560379544: "IFCBOUNDARYEDGECONDITION",
	3367102660: "IFCBOUNDARYFACECONDITION",
	1387855156: "IFCBOUNDARYNODECONDITION",
	2069777674: "IFCBOUNDARYNODECONDITIONWARPING",
	1260505505: "IFCBOUNDEDCURVE",
	4182860854: "IFCBOUNDEDSURFACE",
	2581212453: "IFCBOUNDINGBOX",
	2713105998: "IFCBOXEDHALFSPACE",
	644574406: "IFCBRIDGE",
	963979645: "IFCBRIDGEPART",
	4031249490: "IFCBUILDING",
	3299480353: "IFCBUILDINGELEMENT",
	2979338954: "IFCBUILDINGELEMENTPART",
	39481116: "IFCBUILDINGELEMENTPARTTYPE",
	1095909175: "IFCBUILDINGELEMENTPROXY",
	1909888760: "IFCBUILDINGELEMENTPROXYTYPE",
	1950629157: "IFCBUILDINGELEMENTTYPE",
	3124254112: "IFCBUILDINGSTOREY",
	1177604601: "IFCBUILDINGSYSTEM",
	2938176219: "IFCBURNER",
	2188180465: "IFCBURNERTYPE",
	2898889636: "IFCCSHAPEPROFILEDEF",
	635142910: "IFCCABLECARRIERFITTING",
	395041908: "IFCCABLECARRIERFITTINGTYPE",
	3758799889: "IFCCABLECARRIERSEGMENT",
	3293546465: "IFCCABLECARRIERSEGMENTTYPE",
	1051757585: "IFCCABLEFITTING",
	2674252688: "IFCCABLEFITTINGTYPE",
	4217484030: "IFCCABLESEGMENT",
	1285652485: "IFCCABLESEGMENTTYPE",
	3999819293: "IFCCAISSONFOUNDATION",
	3203706013: "IFCCAISSONFOUNDATIONTYPE",
	1123145078: "IFCCARTESIANPOINT",
	574549367: "IFCCARTESIANPOINTLIST",
	1675464909: "IFCCARTESIANPOINTLIST2D",
	2059837836: "IFCCARTESIANPOINTLIST3D",
	59481748: "IFCCARTESIANTRANSFORMATIONOPERATOR",
	3749851601: "IFCCARTESIANTRANSFORMATIONOPERATOR2D",
	3486308946: "IFCCARTESIANTRANSFORMATIONOPERATOR2DNONUNIFORM",
	3331915920: "IFCCARTESIANTRANSFORMATIONOPERATOR3D",
	1416205885: "IFCCARTESIANTRANSFORMATIONOPERATOR3DNONUNIFORM",
	3150382593: "IFCCENTERLINEPROFILEDEF",
	3902619387: "IFCCHILLER",
	2951183804: "IFCCHILLERTYPE",
	3296154744: "IFCCHIMNEY",
	2197970202: "IFCCHIMNEYTYPE",
	2611217952: "IFCCIRCLE",
	2937912522: "IFCCIRCLEHOLLOWPROFILEDEF",
	1383045692: "IFCCIRCLEPROFILEDEF",
	1062206242: "IFCCIRCULARARCSEGMENT2D",
	1677625105: "IFCCIVILELEMENT",
	3893394355: "IFCCIVILELEMENTTYPE",
	747523909: "IFCCLASSIFICATION",
	647927063: "IFCCLASSIFICATIONREFERENCE",
	2205249479: "IFCCLOSEDSHELL",
	639361253: "IFCCOIL",
	2301859152: "IFCCOILTYPE",
	776857604: "IFCCOLOURRGB",
	3285139300: "IFCCOLOURRGBLIST",
	3264961684: "IFCCOLOURSPECIFICATION",
	843113511: "IFCCOLUMN",
	905975707: "IFCCOLUMNSTANDARDCASE",
	300633059: "IFCCOLUMNTYPE",
	3221913625: "IFCCOMMUNICATIONSAPPLIANCE",
	400855858: "IFCCOMMUNICATIONSAPPLIANCETYPE",
	2542286263: "IFCCOMPLEXPROPERTY",
	3875453745: "IFCCOMPLEXPROPERTYTEMPLATE",
	3732776249: "IFCCOMPOSITECURVE",
	15328376: "IFCCOMPOSITECURVEONSURFACE",
	2485617015: "IFCCOMPOSITECURVESEGMENT",
	1485152156: "IFCCOMPOSITEPROFILEDEF",
	3571504051: "IFCCOMPRESSOR",
	3850581409: "IFCCOMPRESSORTYPE",
	2272882330: "IFCCONDENSER",
	2816379211: "IFCCONDENSERTYPE",
	2510884976: "IFCCONIC",
	370225590: "IFCCONNECTEDFACESET",
	1981873012: "IFCCONNECTIONCURVEGEOMETRY",
	2859738748: "IFCCONNECTIONGEOMETRY",
	45288368: "IFCCONNECTIONPOINTECCENTRICITY",
	2614616156: "IFCCONNECTIONPOINTGEOMETRY",
	2732653382: "IFCCONNECTIONSURFACEGEOMETRY",
	775493141: "IFCCONNECTIONVOLUMEGEOMETRY",
	1959218052: "IFCCONSTRAINT",
	3898045240: "IFCCONSTRUCTIONEQUIPMENTRESOURCE",
	2185764099: "IFCCONSTRUCTIONEQUIPMENTRESOURCETYPE",
	1060000209: "IFCCONSTRUCTIONMATERIALRESOURCE",
	4105962743: "IFCCONSTRUCTIONMATERIALRESOURCETYPE",
	488727124: "IFCCONSTRUCTIONPRODUCTRESOURCE",
	1525564444: "IFCCONSTRUCTIONPRODUCTRESOURCETYPE",
	2559216714: "IFCCONSTRUCTIONRESOURCE",
	2574617495: "IFCCONSTRUCTIONRESOURCETYPE",
	3419103109: "IFCCONTEXT",
	3050246964: "IFCCONTEXTDEPENDENTUNIT",
	3293443760: "IFCCONTROL",
	25142252: "IFCCONTROLLER",
	578613899: "IFCCONTROLLERTYPE",
	2889183280: "IFCCONVERSIONBASEDUNIT",
	2713554722: "IFCCONVERSIONBASEDUNITWITHOFFSET",
	4136498852: "IFCCOOLEDBEAM",
	335055490: "IFCCOOLEDBEAMTYPE",
	3640358203: "IFCCOOLINGTOWER",
	2954562838: "IFCCOOLINGTOWERTYPE",
	1785450214: "IFCCOORDINATEOPERATION",
	1466758467: "IFCCOORDINATEREFERENCESYSTEM",
	3895139033: "IFCCOSTITEM",
	1419761937: "IFCCOSTSCHEDULE",
	602808272: "IFCCOSTVALUE",
	1973544240: "IFCCOVERING",
	1916426348: "IFCCOVERINGTYPE",
	3295246426: "IFCCREWRESOURCE",
	1815067380: "IFCCREWRESOURCETYPE",
	2506170314: "IFCCSGPRIMITIVE3D",
	2147822146: "IFCCSGSOLID",
	539742890: "IFCCURRENCYRELATIONSHIP",
	3495092785: "IFCCURTAINWALL",
	1457835157: "IFCCURTAINWALLTYPE",
	2601014836: "IFCCURVE",
	2827736869: "IFCCURVEBOUNDEDPLANE",
	2629017746: "IFCCURVEBOUNDEDSURFACE",
	1186437898: "IFCCURVESEGMENT2D",
	3800577675: "IFCCURVESTYLE",
	1105321065: "IFCCURVESTYLEFONT",
	2367409068: "IFCCURVESTYLEFONTANDSCALING",
	3510044353: "IFCCURVESTYLEFONTPATTERN",
	1213902940: "IFCCYLINDRICALSURFACE",
	4074379575: "IFCDAMPER",
	3961806047: "IFCDAMPERTYPE",
	3426335179: "IFCDEEPFOUNDATION",
	1306400036: "IFCDEEPFOUNDATIONTYPE",
	3632507154: "IFCDERIVEDPROFILEDEF",
	1765591967: "IFCDERIVEDUNIT",
	1045800335: "IFCDERIVEDUNITELEMENT",
	2949456006: "IFCDIMENSIONALEXPONENTS",
	32440307: "IFCDIRECTION",
	1335981549: "IFCDISCRETEACCESSORY",
	2635815018: "IFCDISCRETEACCESSORYTYPE",
	1945343521: "IFCDISTANCEEXPRESSION",
	1052013943: "IFCDISTRIBUTIONCHAMBERELEMENT",
	1599208980: "IFCDISTRIBUTIONCHAMBERELEMENTTYPE",
	562808652: "IFCDISTRIBUTIONCIRCUIT",
	1062813311: "IFCDISTRIBUTIONCONTROLELEMENT",
	2063403501: "IFCDISTRIBUTIONCONTROLELEMENTTYPE",
	1945004755: "IFCDISTRIBUTIONELEMENT",
	3256556792: "IFCDISTRIBUTIONELEMENTTYPE",
	3040386961: "IFCDISTRIBUTIONFLOWELEMENT",
	3849074793: "IFCDISTRIBUTIONFLOWELEMENTTYPE",
	3041715199: "IFCDISTRIBUTIONPORT",
	3205830791: "IFCDISTRIBUTIONSYSTEM",
	1154170062: "IFCDOCUMENTINFORMATION",
	770865208: "IFCDOCUMENTINFORMATIONRELATIONSHIP",
	3732053477: "IFCDOCUMENTREFERENCE",
	395920057: "IFCDOOR",
	2963535650: "IFCDOORLININGPROPERTIES",
	1714330368: "IFCDOORPANELPROPERTIES",
	3242481149: "IFCDOORSTANDARDCASE",
	526551008: "IFCDOORSTYLE",
	2323601079: "IFCDOORTYPE",
	445594917: "IFCDRAUGHTINGPREDEFINEDCOLOUR",
	4006246654: "IFCDRAUGHTINGPREDEFINEDCURVEFONT",
	342316401: "IFCDUCTFITTING",
	869906466: "IFCDUCTFITTINGTYPE",
	3518393246: "IFCDUCTSEGMENT",
	3760055223: "IFCDUCTSEGMENTTYPE",
	1360408905: "IFCDUCTSILENCER",
	2030761528: "IFCDUCTSILENCERTYPE",
	3900360178: "IFCEDGE",
	476780140: "IFCEDGECURVE",
	1472233963: "IFCEDGELOOP",
	1904799276: "IFCELECTRICAPPLIANCE",
	663422040: "IFCELECTRICAPPLIANCETYPE",
	862014818: "IFCELECTRICDISTRIBUTIONBOARD",
	2417008758: "IFCELECTRICDISTRIBUTIONBOARDTYPE",
	3310460725: "IFCELECTRICFLOWSTORAGEDEVICE",
	3277789161: "IFCELECTRICFLOWSTORAGEDEVICETYPE",
	264262732: "IFCELECTRICGENERATOR",
	1534661035: "IFCELECTRICGENERATORTYPE",
	402227799: "IFCELECTRICMOTOR",
	1217240411: "IFCELECTRICMOTORTYPE",
	1003880860: "IFCELECTRICTIMECONTROL",
	712377611: "IFCELECTRICTIMECONTROLTYPE",
	1758889154: "IFCELEMENT",
	4123344466: "IFCELEMENTASSEMBLY",
	2397081782: "IFCELEMENTASSEMBLYTYPE",
	1623761950: "IFCELEMENTCOMPONENT",
	2590856083: "IFCELEMENTCOMPONENTTYPE",
	1883228015: "IFCELEMENTQUANTITY",
	339256511: "IFCELEMENTTYPE",
	2777663545: "IFCELEMENTARYSURFACE",
	1704287377: "IFCELLIPSE",
	2835456948: "IFCELLIPSEPROFILEDEF",
	1658829314: "IFCENERGYCONVERSIONDEVICE",
	2107101300: "IFCENERGYCONVERSIONDEVICETYPE",
	2814081492: "IFCENGINE",
	132023988: "IFCENGINETYPE",
	3747195512: "IFCEVAPORATIVECOOLER",
	3174744832: "IFCEVAPORATIVECOOLERTYPE",
	484807127: "IFCEVAPORATOR",
	3390157468: "IFCEVAPORATORTYPE",
	4148101412: "IFCEVENT",
	211053100: "IFCEVENTTIME",
	4024345920: "IFCEVENTTYPE",
	297599258: "IFCEXTENDEDPROPERTIES",
	4294318154: "IFCEXTERNALINFORMATION",
	3200245327: "IFCEXTERNALREFERENCE",
	1437805879: "IFCEXTERNALREFERENCERELATIONSHIP",
	1209101575: "IFCEXTERNALSPATIALELEMENT",
	2853485674: "IFCEXTERNALSPATIALSTRUCTUREELEMENT",
	2242383968: "IFCEXTERNALLYDEFINEDHATCHSTYLE",
	1040185647: "IFCEXTERNALLYDEFINEDSURFACESTYLE",
	3548104201: "IFCEXTERNALLYDEFINEDTEXTFONT",
	477187591: "IFCEXTRUDEDAREASOLID",
	2804161546: "IFCEXTRUDEDAREASOLIDTAPERED",
	2556980723: "IFCFACE",
	2047409740: "IFCFACEBASEDSURFACEMODEL",
	1809719519: "IFCFACEBOUND",
	803316827: "IFCFACEOUTERBOUND",
	3008276851: "IFCFACESURFACE",
	807026263: "IFCFACETEDBREP",
	3737207727: "IFCFACETEDBREPWITHVOIDS",
	24185140: "IFCFACILITY",
	1310830890: "IFCFACILITYPART",
	4219587988: "IFCFAILURECONNECTIONCONDITION",
	3415622556: "IFCFAN",
	346874300: "IFCFANTYPE",
	647756555: "IFCFASTENER",
	2489546625: "IFCFASTENERTYPE",
	2827207264: "IFCFEATUREELEMENT",
	2143335405: "IFCFEATUREELEMENTADDITION",
	1287392070: "IFCFEATUREELEMENTSUBTRACTION",
	738692330: "IFCFILLAREASTYLE",
	374418227: "IFCFILLAREASTYLEHATCHING",
	315944413: "IFCFILLAREASTYLETILES",
	819412036: "IFCFILTER",
	1810631287: "IFCFILTERTYPE",
	1426591983: "IFCFIRESUPPRESSIONTERMINAL",
	4222183408: "IFCFIRESUPPRESSIONTERMINALTYPE",
	2652556860: "IFCFIXEDREFERENCESWEPTAREASOLID",
	2058353004: "IFCFLOWCONTROLLER",
	3907093117: "IFCFLOWCONTROLLERTYPE",
	4278956645: "IFCFLOWFITTING",
	3198132628: "IFCFLOWFITTINGTYPE",
	182646315: "IFCFLOWINSTRUMENT",
	4037862832: "IFCFLOWINSTRUMENTTYPE",
	2188021234: "IFCFLOWMETER",
	3815607619: "IFCFLOWMETERTYPE",
	3132237377: "IFCFLOWMOVINGDEVICE",
	1482959167: "IFCFLOWMOVINGDEVICETYPE",
	987401354: "IFCFLOWSEGMENT",
	1834744321: "IFCFLOWSEGMENTTYPE",
	707683696: "IFCFLOWSTORAGEDEVICE",
	1339347760: "IFCFLOWSTORAGEDEVICETYPE",
	2223149337: "IFCFLOWTERMINAL",
	2297155007: "IFCFLOWTERMINALTYPE",
	3508470533: "IFCFLOWTREATMENTDEVICE",
	3009222698: "IFCFLOWTREATMENTDEVICETYPE",
	900683007: "IFCFOOTING",
	1893162501: "IFCFOOTINGTYPE",
	263784265: "IFCFURNISHINGELEMENT",
	4238390223: "IFCFURNISHINGELEMENTTYPE",
	1509553395: "IFCFURNITURE",
	1268542332: "IFCFURNITURETYPE",
	3493046030: "IFCGEOGRAPHICELEMENT",
	4095422895: "IFCGEOGRAPHICELEMENTTYPE",
	987898635: "IFCGEOMETRICCURVESET",
	3448662350: "IFCGEOMETRICREPRESENTATIONCONTEXT",
	2453401579: "IFCGEOMETRICREPRESENTATIONITEM",
	4142052618: "IFCGEOMETRICREPRESENTATIONSUBCONTEXT",
	3590301190: "IFCGEOMETRICSET",
	3009204131: "IFCGRID",
	852622518: "IFCGRIDAXIS",
	178086475: "IFCGRIDPLACEMENT",
	2706460486: "IFCGROUP",
	812098782: "IFCHALFSPACESOLID",
	3319311131: "IFCHEATEXCHANGER",
	1251058090: "IFCHEATEXCHANGERTYPE",
	2068733104: "IFCHUMIDIFIER",
	1806887404: "IFCHUMIDIFIERTYPE",
	1484403080: "IFCISHAPEPROFILEDEF",
	3905492369: "IFCIMAGETEXTURE",
	3570813810: "IFCINDEXEDCOLOURMAP",
	2571569899: "IFCINDEXEDPOLYCURVE",
	178912537: "IFCINDEXEDPOLYGONALFACE",
	2294589976: "IFCINDEXEDPOLYGONALFACEWITHVOIDS",
	1437953363: "IFCINDEXEDTEXTUREMAP",
	2133299955: "IFCINDEXEDTRIANGLETEXTUREMAP",
	4175244083: "IFCINTERCEPTOR",
	3946677679: "IFCINTERCEPTORTYPE",
	3113134337: "IFCINTERSECTIONCURVE",
	2391368822: "IFCINVENTORY",
	3741457305: "IFCIRREGULARTIMESERIES",
	3020489413: "IFCIRREGULARTIMESERIESVALUE",
	2176052936: "IFCJUNCTIONBOX",
	4288270099: "IFCJUNCTIONBOXTYPE",
	572779678: "IFCLSHAPEPROFILEDEF",
	3827777499: "IFCLABORRESOURCE",
	428585644: "IFCLABORRESOURCETYPE",
	1585845231: "IFCLAGTIME",
	76236018: "IFCLAMP",
	1051575348: "IFCLAMPTYPE",
	2655187982: "IFCLIBRARYINFORMATION",
	3452421091: "IFCLIBRARYREFERENCE",
	4162380809: "IFCLIGHTDISTRIBUTIONDATA",
	629592764: "IFCLIGHTFIXTURE",
	1161773419: "IFCLIGHTFIXTURETYPE",
	1566485204: "IFCLIGHTINTENSITYDISTRIBUTION",
	1402838566: "IFCLIGHTSOURCE",
	125510826: "IFCLIGHTSOURCEAMBIENT",
	2604431987: "IFCLIGHTSOURCEDIRECTIONAL",
	4266656042: "IFCLIGHTSOURCEGONIOMETRIC",
	1520743889: "IFCLIGHTSOURCEPOSITIONAL",
	3422422726: "IFCLIGHTSOURCESPOT",
	1281925730: "IFCLINE",
	3092502836: "IFCLINESEGMENT2D",
	388784114: "IFCLINEARPLACEMENT",
	1154579445: "IFCLINEARPOSITIONINGELEMENT",
	2624227202: "IFCLOCALPLACEMENT",
	1008929658: "IFCLOOP",
	1425443689: "IFCMANIFOLDSOLIDBREP",
	3057273783: "IFCMAPCONVERSION",
	2347385850: "IFCMAPPEDITEM",
	1838606355: "IFCMATERIAL",
	1847130766: "IFCMATERIALCLASSIFICATIONRELATIONSHIP",
	3708119000: "IFCMATERIALCONSTITUENT",
	2852063980: "IFCMATERIALCONSTITUENTSET",
	760658860: "IFCMATERIALDEFINITION",
	2022407955: "IFCMATERIALDEFINITIONREPRESENTATION",
	248100487: "IFCMATERIALLAYER",
	3303938423: "IFCMATERIALLAYERSET",
	1303795690: "IFCMATERIALLAYERSETUSAGE",
	1847252529: "IFCMATERIALLAYERWITHOFFSETS",
	2199411900: "IFCMATERIALLIST",
	2235152071: "IFCMATERIALPROFILE",
	164193824: "IFCMATERIALPROFILESET",
	3079605661: "IFCMATERIALPROFILESETUSAGE",
	3404854881: "IFCMATERIALPROFILESETUSAGETAPERING",
	552965576: "IFCMATERIALPROFILEWITHOFFSETS",
	3265635763: "IFCMATERIALPROPERTIES",
	853536259: "IFCMATERIALRELATIONSHIP",
	1507914824: "IFCMATERIALUSAGEDEFINITION",
	2597039031: "IFCMEASUREWITHUNIT",
	377706215: "IFCMECHANICALFASTENER",
	2108223431: "IFCMECHANICALFASTENERTYPE",
	1437502449: "IFCMEDICALDEVICE",
	1114901282: "IFCMEDICALDEVICETYPE",
	1073191201: "IFCMEMBER",
	1911478936: "IFCMEMBERSTANDARDCASE",
	3181161470: "IFCMEMBERTYPE",
	3368373690: "IFCMETRIC",
	2998442950: "IFCMIRROREDPROFILEDEF",
	2706619895: "IFCMONETARYUNIT",
	2474470126: "IFCMOTORCONNECTION",
	977012517: "IFCMOTORCONNECTIONTYPE",
	1918398963: "IFCNAMEDUNIT",
	3888040117: "IFCOBJECT",
	219451334: "IFCOBJECTDEFINITION",
	3701648758: "IFCOBJECTPLACEMENT",
	2251480897: "IFCOBJECTIVE",
	4143007308: "IFCOCCUPANT",
	590820931: "IFCOFFSETCURVE",
	3388369263: "IFCOFFSETCURVE2D",
	3505215534: "IFCOFFSETCURVE3D",
	2485787929: "IFCOFFSETCURVEBYDISTANCES",
	2665983363: "IFCOPENSHELL",
	3588315303: "IFCOPENINGELEMENT",
	3079942009: "IFCOPENINGSTANDARDCASE",
	4251960020: "IFCORGANIZATION",
	1411181986: "IFCORGANIZATIONRELATIONSHIP",
	643959842: "IFCORIENTATIONEXPRESSION",
	1029017970: "IFCORIENTEDEDGE",
	144952367: "IFCOUTERBOUNDARYCURVE",
	3694346114: "IFCOUTLET",
	2837617999: "IFCOUTLETTYPE",
	1207048766: "IFCOWNERHISTORY",
	2529465313: "IFCPARAMETERIZEDPROFILEDEF",
	2519244187: "IFCPATH",
	1682466193: "IFCPCURVE",
	2382730787: "IFCPERFORMANCEHISTORY",
	3566463478: "IFCPERMEABLECOVERINGPROPERTIES",
	3327091369: "IFCPERMIT",
	2077209135: "IFCPERSON",
	101040310: "IFCPERSONANDORGANIZATION",
	3021840470: "IFCPHYSICALCOMPLEXQUANTITY",
	2483315170: "IFCPHYSICALQUANTITY",
	2226359599: "IFCPHYSICALSIMPLEQUANTITY",
	1687234759: "IFCPILE",
	1158309216: "IFCPILETYPE",
	310824031: "IFCPIPEFITTING",
	804291784: "IFCPIPEFITTINGTYPE",
	3612865200: "IFCPIPESEGMENT",
	4231323485: "IFCPIPESEGMENTTYPE",
	597895409: "IFCPIXELTEXTURE",
	2004835150: "IFCPLACEMENT",
	603570806: "IFCPLANARBOX",
	1663979128: "IFCPLANAREXTENT",
	220341763: "IFCPLANE",
	3171933400: "IFCPLATE",
	1156407060: "IFCPLATESTANDARDCASE",
	4017108033: "IFCPLATETYPE",
	2067069095: "IFCPOINT",
	4022376103: "IFCPOINTONCURVE",
	1423911732: "IFCPOINTONSURFACE",
	2924175390: "IFCPOLYLOOP",
	2775532180: "IFCPOLYGONALBOUNDEDHALFSPACE",
	2839578677: "IFCPOLYGONALFACESET",
	3724593414: "IFCPOLYLINE",
	3740093272: "IFCPORT",
	1946335990: "IFCPOSITIONINGELEMENT",
	3355820592: "IFCPOSTALADDRESS",
	759155922: "IFCPREDEFINEDCOLOUR",
	2559016684: "IFCPREDEFINEDCURVEFONT",
	3727388367: "IFCPREDEFINEDITEM",
	3778827333: "IFCPREDEFINEDPROPERTIES",
	3967405729: "IFCPREDEFINEDPROPERTYSET",
	1775413392: "IFCPREDEFINEDTEXTFONT",
	677532197: "IFCPRESENTATIONITEM",
	2022622350: "IFCPRESENTATIONLAYERASSIGNMENT",
	1304840413: "IFCPRESENTATIONLAYERWITHSTYLE",
	3119450353: "IFCPRESENTATIONSTYLE",
	2417041796: "IFCPRESENTATIONSTYLEASSIGNMENT",
	2744685151: "IFCPROCEDURE",
	569719735: "IFCPROCEDURETYPE",
	2945172077: "IFCPROCESS",
	4208778838: "IFCPRODUCT",
	673634403: "IFCPRODUCTDEFINITIONSHAPE",
	2095639259: "IFCPRODUCTREPRESENTATION",
	3958567839: "IFCPROFILEDEF",
	2802850158: "IFCPROFILEPROPERTIES",
	103090709: "IFCPROJECT",
	653396225: "IFCPROJECTLIBRARY",
	2904328755: "IFCPROJECTORDER",
	3843373140: "IFCPROJECTEDCRS",
	3651124850: "IFCPROJECTIONELEMENT",
	2598011224: "IFCPROPERTY",
	986844984: "IFCPROPERTYABSTRACTION",
	871118103: "IFCPROPERTYBOUNDEDVALUE",
	1680319473: "IFCPROPERTYDEFINITION",
	148025276: "IFCPROPERTYDEPENDENCYRELATIONSHIP",
	4166981789: "IFCPROPERTYENUMERATEDVALUE",
	3710013099: "IFCPROPERTYENUMERATION",
	2752243245: "IFCPROPERTYLISTVALUE",
	941946838: "IFCPROPERTYREFERENCEVALUE",
	1451395588: "IFCPROPERTYSET",
	3357820518: "IFCPROPERTYSETDEFINITION",
	492091185: "IFCPROPERTYSETTEMPLATE",
	3650150729: "IFCPROPERTYSINGLEVALUE",
	110355661: "IFCPROPERTYTABLEVALUE",
	3521284610: "IFCPROPERTYTEMPLATE",
	1482703590: "IFCPROPERTYTEMPLATEDEFINITION",
	738039164: "IFCPROTECTIVEDEVICE",
	2295281155: "IFCPROTECTIVEDEVICETRIPPINGUNIT",
	655969474: "IFCPROTECTIVEDEVICETRIPPINGUNITTYPE",
	1842657554: "IFCPROTECTIVEDEVICETYPE",
	3219374653: "IFCPROXY",
	90941305: "IFCPUMP",
	2250791053: "IFCPUMPTYPE",
	2044713172: "IFCQUANTITYAREA",
	2093928680: "IFCQUANTITYCOUNT",
	931644368: "IFCQUANTITYLENGTH",
	2090586900: "IFCQUANTITYSET",
	3252649465: "IFCQUANTITYTIME",
	2405470396: "IFCQUANTITYVOLUME",
	825690147: "IFCQUANTITYWEIGHT",
	2262370178: "IFCRAILING",
	2893384427: "IFCRAILINGTYPE",
	3024970846: "IFCRAMP",
	3283111854: "IFCRAMPFLIGHT",
	2324767716: "IFCRAMPFLIGHTTYPE",
	1469900589: "IFCRAMPTYPE",
	1232101972: "IFCRATIONALBSPLINECURVEWITHKNOTS",
	683857671: "IFCRATIONALBSPLINESURFACEWITHKNOTS",
	2770003689: "IFCRECTANGLEHOLLOWPROFILEDEF",
	3615266464: "IFCRECTANGLEPROFILEDEF",
	2798486643: "IFCRECTANGULARPYRAMID",
	3454111270: "IFCRECTANGULARTRIMMEDSURFACE",
	3915482550: "IFCRECURRENCEPATTERN",
	2433181523: "IFCREFERENCE",
	4021432810: "IFCREFERENT",
	3413951693: "IFCREGULARTIMESERIES",
	1580146022: "IFCREINFORCEMENTBARPROPERTIES",
	3765753017: "IFCREINFORCEMENTDEFINITIONPROPERTIES",
	979691226: "IFCREINFORCINGBAR",
	2572171363: "IFCREINFORCINGBARTYPE",
	3027567501: "IFCREINFORCINGELEMENT",
	964333572: "IFCREINFORCINGELEMENTTYPE",
	2320036040: "IFCREINFORCINGMESH",
	2310774935: "IFCREINFORCINGMESHTYPE",
	160246688: "IFCRELAGGREGATES",
	3939117080: "IFCRELASSIGNS",
	1683148259: "IFCRELASSIGNSTOACTOR",
	2495723537: "IFCRELASSIGNSTOCONTROL",
	1307041759: "IFCRELASSIGNSTOGROUP",
	1027710054: "IFCRELASSIGNSTOGROUPBYFACTOR",
	4278684876: "IFCRELASSIGNSTOPROCESS",
	2857406711: "IFCRELASSIGNSTOPRODUCT",
	205026976: "IFCRELASSIGNSTORESOURCE",
	1865459582: "IFCRELASSOCIATES",
	4095574036: "IFCRELASSOCIATESAPPROVAL",
	919958153: "IFCRELASSOCIATESCLASSIFICATION",
	2728634034: "IFCRELASSOCIATESCONSTRAINT",
	982818633: "IFCRELASSOCIATESDOCUMENT",
	3840914261: "IFCRELASSOCIATESLIBRARY",
	2655215786: "IFCRELASSOCIATESMATERIAL",
	826625072: "IFCRELCONNECTS",
	1204542856: "IFCRELCONNECTSELEMENTS",
	3945020480: "IFCRELCONNECTSPATHELEMENTS",
	4201705270: "IFCRELCONNECTSPORTTOELEMENT",
	3190031847: "IFCRELCONNECTSPORTS",
	2127690289: "IFCRELCONNECTSSTRUCTURALACTIVITY",
	1638771189: "IFCRELCONNECTSSTRUCTURALMEMBER",
	504942748: "IFCRELCONNECTSWITHECCENTRICITY",
	3678494232: "IFCRELCONNECTSWITHREALIZINGELEMENTS",
	3242617779: "IFCRELCONTAINEDINSPATIALSTRUCTURE",
	886880790: "IFCRELCOVERSBLDGELEMENTS",
	2802773753: "IFCRELCOVERSSPACES",
	2565941209: "IFCRELDECLARES",
	2551354335: "IFCRELDECOMPOSES",
	693640335: "IFCRELDEFINES",
	1462361463: "IFCRELDEFINESBYOBJECT",
	4186316022: "IFCRELDEFINESBYPROPERTIES",
	307848117: "IFCRELDEFINESBYTEMPLATE",
	781010003: "IFCRELDEFINESBYTYPE",
	3940055652: "IFCRELFILLSELEMENT",
	279856033: "IFCRELFLOWCONTROLELEMENTS",
	427948657: "IFCRELINTERFERESELEMENTS",
	3268803585: "IFCRELNESTS",
	1441486842: "IFCRELPOSITIONS",
	750771296: "IFCRELPROJECTSELEMENT",
	1245217292: "IFCRELREFERENCEDINSPATIALSTRUCTURE",
	4122056220: "IFCRELSEQUENCE",
	366585022: "IFCRELSERVICESBUILDINGS",
	3451746338: "IFCRELSPACEBOUNDARY",
	3523091289: "IFCRELSPACEBOUNDARY1STLEVEL",
	1521410863: "IFCRELSPACEBOUNDARY2NDLEVEL",
	1401173127: "IFCRELVOIDSELEMENT",
	478536968: "IFCRELATIONSHIP",
	816062949: "IFCREPARAMETRISEDCOMPOSITECURVESEGMENT",
	1076942058: "IFCREPRESENTATION",
	3377609919: "IFCREPRESENTATIONCONTEXT",
	3008791417: "IFCREPRESENTATIONITEM",
	1660063152: "IFCREPRESENTATIONMAP",
	2914609552: "IFCRESOURCE",
	2943643501: "IFCRESOURCEAPPROVALRELATIONSHIP",
	1608871552: "IFCRESOURCECONSTRAINTRELATIONSHIP",
	2439245199: "IFCRESOURCELEVELRELATIONSHIP",
	1042787934: "IFCRESOURCETIME",
	1856042241: "IFCREVOLVEDAREASOLID",
	3243963512: "IFCREVOLVEDAREASOLIDTAPERED",
	4158566097: "IFCRIGHTCIRCULARCONE",
	3626867408: "IFCRIGHTCIRCULARCYLINDER",
	2016517767: "IFCROOF",
	2781568857: "IFCROOFTYPE",
	2341007311: "IFCROOT",
	2778083089: "IFCROUNDEDRECTANGLEPROFILEDEF",
	448429030: "IFCSIUNIT",
	3053780830: "IFCSANITARYTERMINAL",
	1768891740: "IFCSANITARYTERMINALTYPE",
	1054537805: "IFCSCHEDULINGTIME",
	2157484638: "IFCSEAMCURVE",
	2042790032: "IFCSECTIONPROPERTIES",
	4165799628: "IFCSECTIONREINFORCEMENTPROPERTIES",
	1862484736: "IFCSECTIONEDSOLID",
	1290935644: "IFCSECTIONEDSOLIDHORIZONTAL",
	1509187699: "IFCSECTIONEDSPINE",
	4086658281: "IFCSENSOR",
	1783015770: "IFCSENSORTYPE",
	1329646415: "IFCSHADINGDEVICE",
	4074543187: "IFCSHADINGDEVICETYPE",
	867548509: "IFCSHAPEASPECT",
	3982875396: "IFCSHAPEMODEL",
	4240577450: "IFCSHAPEREPRESENTATION",
	4124623270: "IFCSHELLBASEDSURFACEMODEL",
	3692461612: "IFCSIMPLEPROPERTY",
	3663146110: "IFCSIMPLEPROPERTYTEMPLATE",
	4097777520: "IFCSITE",
	1529196076: "IFCSLAB",
	3127900445: "IFCSLABELEMENTEDCASE",
	3027962421: "IFCSLABSTANDARDCASE",
	2533589738: "IFCSLABTYPE",
	2609359061: "IFCSLIPPAGECONNECTIONCONDITION",
	3420628829: "IFCSOLARDEVICE",
	1072016465: "IFCSOLARDEVICETYPE",
	723233188: "IFCSOLIDMODEL",
	3856911033: "IFCSPACE",
	1999602285: "IFCSPACEHEATER",
	1305183839: "IFCSPACEHEATERTYPE",
	3812236995: "IFCSPACETYPE",
	1412071761: "IFCSPATIALELEMENT",
	710998568: "IFCSPATIALELEMENTTYPE",
	2706606064: "IFCSPATIALSTRUCTUREELEMENT",
	3893378262: "IFCSPATIALSTRUCTUREELEMENTTYPE",
	463610769: "IFCSPATIALZONE",
	2481509218: "IFCSPATIALZONETYPE",
	451544542: "IFCSPHERE",
	4015995234: "IFCSPHERICALSURFACE",
	1404847402: "IFCSTACKTERMINAL",
	3112655638: "IFCSTACKTERMINALTYPE",
	331165859: "IFCSTAIR",
	4252922144: "IFCSTAIRFLIGHT",
	1039846685: "IFCSTAIRFLIGHTTYPE",
	338393293: "IFCSTAIRTYPE",
	682877961: "IFCSTRUCTURALACTION",
	3544373492: "IFCSTRUCTURALACTIVITY",
	2515109513: "IFCSTRUCTURALANALYSISMODEL",
	1179482911: "IFCSTRUCTURALCONNECTION",
	2273995522: "IFCSTRUCTURALCONNECTIONCONDITION",
	1004757350: "IFCSTRUCTURALCURVEACTION",
	4243806635: "IFCSTRUCTURALCURVECONNECTION",
	214636428: "IFCSTRUCTURALCURVEMEMBER",
	2445595289: "IFCSTRUCTURALCURVEMEMBERVARYING",
	2757150158: "IFCSTRUCTURALCURVEREACTION",
	3136571912: "IFCSTRUCTURALITEM",
	1807405624: "IFCSTRUCTURALLINEARACTION",
	2162789131: "IFCSTRUCTURALLOAD",
	385403989: "IFCSTRUCTURALLOADCASE",
	3478079324: "IFCSTRUCTURALLOADCONFIGURATION",
	1252848954: "IFCSTRUCTURALLOADGROUP",
	1595516126: "IFCSTRUCTURALLOADLINEARFORCE",
	609421318: "IFCSTRUCTURALLOADORRESULT",
	2668620305: "IFCSTRUCTURALLOADPLANARFORCE",
	2473145415: "IFCSTRUCTURALLOADSINGLEDISPLACEMENT",
	1973038258: "IFCSTRUCTURALLOADSINGLEDISPLACEMENTDISTORTION",
	1597423693: "IFCSTRUCTURALLOADSINGLEFORCE",
	1190533807: "IFCSTRUCTURALLOADSINGLEFORCEWARPING",
	2525727697: "IFCSTRUCTURALLOADSTATIC",
	3408363356: "IFCSTRUCTURALLOADTEMPERATURE",
	530289379: "IFCSTRUCTURALMEMBER",
	1621171031: "IFCSTRUCTURALPLANARACTION",
	2082059205: "IFCSTRUCTURALPOINTACTION",
	734778138: "IFCSTRUCTURALPOINTCONNECTION",
	1235345126: "IFCSTRUCTURALPOINTREACTION",
	3689010777: "IFCSTRUCTURALREACTION",
	2986769608: "IFCSTRUCTURALRESULTGROUP",
	3657597509: "IFCSTRUCTURALSURFACEACTION",
	1975003073: "IFCSTRUCTURALSURFACECONNECTION",
	3979015343: "IFCSTRUCTURALSURFACEMEMBER",
	2218152070: "IFCSTRUCTURALSURFACEMEMBERVARYING",
	603775116: "IFCSTRUCTURALSURFACEREACTION",
	2830218821: "IFCSTYLEMODEL",
	3958052878: "IFCSTYLEDITEM",
	3049322572: "IFCSTYLEDREPRESENTATION",
	148013059: "IFCSUBCONTRACTRESOURCE",
	4095615324: "IFCSUBCONTRACTRESOURCETYPE",
	2233826070: "IFCSUBEDGE",
	2513912981: "IFCSURFACE",
	699246055: "IFCSURFACECURVE",
	2028607225: "IFCSURFACECURVESWEPTAREASOLID",
	3101698114: "IFCSURFACEFEATURE",
	2809605785: "IFCSURFACEOFLINEAREXTRUSION",
	4124788165: "IFCSURFACEOFREVOLUTION",
	2934153892: "IFCSURFACEREINFORCEMENTAREA",
	1300840506: "IFCSURFACESTYLE",
	3303107099: "IFCSURFACESTYLELIGHTING",
	1607154358: "IFCSURFACESTYLEREFRACTION",
	1878645084: "IFCSURFACESTYLERENDERING",
	846575682: "IFCSURFACESTYLESHADING",
	1351298697: "IFCSURFACESTYLEWITHTEXTURES",
	626085974: "IFCSURFACETEXTURE",
	2247615214: "IFCSWEPTAREASOLID",
	1260650574: "IFCSWEPTDISKSOLID",
	1096409881: "IFCSWEPTDISKSOLIDPOLYGONAL",
	230924584: "IFCSWEPTSURFACE",
	1162798199: "IFCSWITCHINGDEVICE",
	2315554128: "IFCSWITCHINGDEVICETYPE",
	2254336722: "IFCSYSTEM",
	413509423: "IFCSYSTEMFURNITUREELEMENT",
	1580310250: "IFCSYSTEMFURNITUREELEMENTTYPE",
	3071757647: "IFCTSHAPEPROFILEDEF",
	985171141: "IFCTABLE",
	2043862942: "IFCTABLECOLUMN",
	531007025: "IFCTABLEROW",
	812556717: "IFCTANK",
	5716631: "IFCTANKTYPE",
	3473067441: "IFCTASK",
	1549132990: "IFCTASKTIME",
	2771591690: "IFCTASKTIMERECURRING",
	3206491090: "IFCTASKTYPE",
	912023232: "IFCTELECOMADDRESS",
	3824725483: "IFCTENDON",
	2347447852: "IFCTENDONANCHOR",
	3081323446: "IFCTENDONANCHORTYPE",
	3663046924: "IFCTENDONCONDUIT",
	2281632017: "IFCTENDONCONDUITTYPE",
	2415094496: "IFCTENDONTYPE",
	2387106220: "IFCTESSELLATEDFACESET",
	901063453: "IFCTESSELLATEDITEM",
	4282788508: "IFCTEXTLITERAL",
	3124975700: "IFCTEXTLITERALWITHEXTENT",
	1447204868: "IFCTEXTSTYLE",
	1983826977: "IFCTEXTSTYLEFONTMODEL",
	2636378356: "IFCTEXTSTYLEFORDEFINEDFONT",
	1640371178: "IFCTEXTSTYLETEXTMODEL",
	280115917: "IFCTEXTURECOORDINATE",
	1742049831: "IFCTEXTURECOORDINATEGENERATOR",
	2552916305: "IFCTEXTUREMAP",
	1210645708: "IFCTEXTUREVERTEX",
	3611470254: "IFCTEXTUREVERTEXLIST",
	1199560280: "IFCTIMEPERIOD",
	3101149627: "IFCTIMESERIES",
	581633288: "IFCTIMESERIESVALUE",
	1377556343: "IFCTOPOLOGICALREPRESENTATIONITEM",
	1735638870: "IFCTOPOLOGYREPRESENTATION",
	1935646853: "IFCTOROIDALSURFACE",
	3825984169: "IFCTRANSFORMER",
	1692211062: "IFCTRANSFORMERTYPE",
	2595432518: "IFCTRANSITIONCURVESEGMENT2D",
	1620046519: "IFCTRANSPORTELEMENT",
	2097647324: "IFCTRANSPORTELEMENTTYPE",
	2715220739: "IFCTRAPEZIUMPROFILEDEF",
	2916149573: "IFCTRIANGULATEDFACESET",
	1229763772: "IFCTRIANGULATEDIRREGULARNETWORK",
	3593883385: "IFCTRIMMEDCURVE",
	3026737570: "IFCTUBEBUNDLE",
	1600972822: "IFCTUBEBUNDLETYPE",
	1628702193: "IFCTYPEOBJECT",
	3736923433: "IFCTYPEPROCESS",
	2347495698: "IFCTYPEPRODUCT",
	3698973494: "IFCTYPERESOURCE",
	427810014: "IFCUSHAPEPROFILEDEF",
	180925521: "IFCUNITASSIGNMENT",
	630975310: "IFCUNITARYCONTROLELEMENT",
	3179687236: "IFCUNITARYCONTROLELEMENTTYPE",
	4292641817: "IFCUNITARYEQUIPMENT",
	1911125066: "IFCUNITARYEQUIPMENTTYPE",
	4207607924: "IFCVALVE",
	728799441: "IFCVALVETYPE",
	1417489154: "IFCVECTOR",
	2799835756: "IFCVERTEX",
	2759199220: "IFCVERTEXLOOP",
	1907098498: "IFCVERTEXPOINT",
	1530820697: "IFCVIBRATIONDAMPER",
	3956297820: "IFCVIBRATIONDAMPERTYPE",
	2391383451: "IFCVIBRATIONISOLATOR",
	3313531582: "IFCVIBRATIONISOLATORTYPE",
	2769231204: "IFCVIRTUALELEMENT",
	891718957: "IFCVIRTUALGRIDINTERSECTION",
	926996030: "IFCVOIDINGFEATURE",
	2391406946: "IFCWALL",
	4156078855: "IFCWALLELEMENTEDCASE",
	3512223829: "IFCWALLSTANDARDCASE",
	1898987631: "IFCWALLTYPE",
	4237592921: "IFCWASTETERMINAL",
	1133259667: "IFCWASTETERMINALTYPE",
	3304561284: "IFCWINDOW",
	336235671: "IFCWINDOWLININGPROPERTIES",
	512836454: "IFCWINDOWPANELPROPERTIES",
	486154966: "IFCWINDOWSTANDARDCASE",
	1299126871: "IFCWINDOWSTYLE",
	4009809668: "IFCWINDOWTYPE",
	4088093105: "IFCWORKCALENDAR",
	1028945134: "IFCWORKCONTROL",
	4218914973: "IFCWORKPLAN",
	3342526732: "IFCWORKSCHEDULE",
	1236880293: "IFCWORKTIME",
	2543172580: "IFCZSHAPEPROFILEDEF",
	1033361043: "IFCZONE",
};

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * Shorcut of {@link samchon.library}.
         */
        folding.library = samchon.library;
        /**
         * Shorcut of {@link samchon.collection}.
         */
        folding.collection = samchon.collection;
        /**
         * Shorcut of {@link samchon.protocol}.
         */
        folding.protocol = samchon.protocol;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * 오프셋 장비 엔티티.
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var Device = (function (_super) {
            __extends(Device, _super);
            function Device() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
                if (args.length == 4) {
                    this.bited = args[0];
                    this.bited_direction = args[1];
                    this.non_printable_width = args[2];
                    this.non_printable_height = args[3];
                }
                else
                    this.init();
            }
            /**
             * @inheritdoc
             */
            Device.prototype.init = function () {
                this.bited = 3;
                this.bited_direction = false;
                this.non_printable_width = 2;
                this.non_printable_height = 5;
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            // COMPUTATIONS
            /**
             * 구와이 가로 길이를 계산.
             */
            Device.prototype.computeBitedWidth = function () {
                return this.bited_direction == false ? 0 : this.bited;
            };
            /**
             * 구와이 세로 길이를 계산.
             */
            Device.prototype.computeBitedHeight = function () {
                return this.bited_direction == false ? this.bited : 0;
            };
            // GETTERS
            Device.prototype.getBited = function () { return this.bited; };
            Device.prototype.getBitedDirection = function () { return this.bited_direction; };
            Device.prototype.getNonPrintableWidth = function () { return this.non_printable_width; };
            Device.prototype.getNonPrintableHeight = function () { return this.non_printable_height; };
            // SETTERS
            Device.prototype.setBited = function (val) { this.bited = val; };
            Device.prototype.setBitedDirection = function (val) { this.bited_direction = val; };
            Device.prototype.setNonPrintableWidth = function (val) { this.non_printable_width = val; };
            Device.prototype.setNonPrintableHeight = function (val) { this.non_printable_height = val; };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            Device.prototype.TAG = function () {
                return "device";
            };
            return Device;
        }(folding.protocol.Entity));
        folding.Device = Device;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 비필수 선택 가격모형. </p>
         *
         * <p> {@link OptionalModel} 은 조판 과정에 있어 필수가 아닌, 사용자가 취사 선택할 수 있는 공정들에 대한 추상
         * 가격모형 클래스이다. 현 공정이 조판에서 사용되는 가를 의미하는 {@link used} 와 현 공정을 적용키 위해 필요한
         * 면당 여분지 수량을 의미하는 {@link sparePapers} 를 멤버로 가진다. </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var OptionalModel = (function (_super) {
            __extends(OptionalModel, _super);
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function OptionalModel(priceModels) {
                _super.call(this);
                this.price_models = priceModels;
                this.init();
            }
            Object.defineProperty(OptionalModel.prototype, "process", {
                get: function () {
                    return this.price_models.getProcess();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * <p> 현 공정을 적용함에 있어 필요한 여분지, 여분지의 총 면적을 계산한다. </p>
             *
             * <p> 각 공정마다 조판면을 구성함에 있어 각기 필요한 여분지 매수가 있다. 이렇게 필요한 모든 여분지의
             * 전체 면적을 계산한다. 보통은 각 조판면의 면적에 대하여 여분지 매수를 곱하고, 이들을 합하여 총 면적을
             * 구한다. {@link OptionalModel.compute_spare_area} 에서는, 이 보통의 경우를 계산한다. </p>
             *
             * <ul>
             *	<li>
             *		라미네이팅 코팅은, 각 조판면마다 여분용지가 필요한 게 아니고, 사용케 되는 용지 크기에 따라
             *		여분 용지를 필요로 하게 된다. 때문에, {@link LaminatingModel} 은 별도의 여분용지면적 계산
             *		메소드가 따로이 정의되어있다.
             *	</li>
             * </ul>
             *
             * @param folder 접지행위자
             * @return 필요 여분지에 대한 총 면적
             */
            OptionalModel.prototype.compute_spare_area = function () {
                if (this.isUsed() == false)
                    return 0;
                var area = 0;
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    var my_area = placement.getPaperSize().computeArea();
                    my_area *= this.sparePapers * placement.face_count();
                    area += my_area;
                }
                return area;
            };
            OptionalModel.prototype.isUsed = function () { return this.used; };
            OptionalModel.prototype.getSparePapers = function () { return this.sparePapers; };
            OptionalModel.prototype.setUsed = function (val) { this.used = val; };
            OptionalModel.prototype.setSparePapers = function (val) { this.sparePapers = val; };
            return OptionalModel;
        }(folding.protocol.Entity));
        folding.OptionalModel = OptionalModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
/// <reference path="OptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 비필수 양단면 선택가능 모형. </p>
         *
         * <p> {@link SideOptionalModel} 은 조판 과정에서 필수가 아닌, 사용자가 취사 선택할 수 있는 공정 中 양/단면 여부를
         * 추가적으로 결정할 수 있는 공정들에 대한 추상 가격모형 클래스이다. {@link OptionalModel} 의 멤버에 더불어, 양/단면
         * 코드를 의미하는 {@link side} 멤버를 추가로 가진다. </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var SideOptionalModel = (function (_super) {
            __extends(SideOptionalModel, _super);
            function SideOptionalModel() {
                _super.apply(this, arguments);
            }
            // using super::constructor
            SideOptionalModel.prototype.getSide = function () {
                return this.side;
            };
            SideOptionalModel.prototype.setSide = function (val) {
                this.side = val;
            };
            return SideOptionalModel;
        }(folding.OptionalModel));
        folding.SideOptionalModel = SideOptionalModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 박 모형. </p>
         *
         * <ol>
         *	<li> 작업비: 25,000 원 / 1,000 면 </li>
         *	<li> 동판비 (도장): 200 원 / cm<sup>2</sup> </li>
         *	<li> 박비 (잉크): 1,300 원 / m<sup>2</sup> </li>
         * </ol>
         *
         * <h3> 비고 </h3>
         * <ul>
         *	<li> 양/단면 선택 가능 </li>
         *	<li> 여유 용지: 각 판면당 30 매 </li>
         * </ul>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var FoilModel = (function (_super) {
            __extends(FoilModel, _super);
            function FoilModel() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            // using super::constructor
            /**
             * @inheritdoc
             */
            FoilModel.prototype.init = function () {
                // BASE MEMBERS
                this.used = false;
                this.side = 2;
                this.sparePapers = 30;
                // SPECIFIED MEMBERS
                this.workPrice = 25000;
                this.workFaces = 1000;
                this.copperPrice = 200;
                this.inkPrice = 1300;
                // TEMPORARY MEMBERS
                this.__inkAreaPercentage = 7;
            };
            /* =========================================================
                ACCESSROS
                    - COMPUTES
                    - GETTERS
                    - SETTERS
            ============================================================
                COMPUTES
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            FoilModel.prototype.computePrice = function () {
                if (this.isUsed() == false)
                    return 0;
                return this.compute_work_price() + this.compute_copper_price() + this.compute_ink_price();
            };
            /**
             * 단위 수를 계산함.
             */
            FoilModel.prototype.compute_units = function () {
                // 각 면마다 별개의 작업 (유닛) 으로 친다
                // 각 면마다, 사본 수량만큼 찍게 되는데, 이 때 사본의 수량이 각 면의 작업 유닛 수를 결정함
                var units = 0;
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    units += placement.face_count() * Math.ceil(placement.computeCopies() / this.workFaces);
                }
                return units;
            };
            FoilModel.prototype.compute_work_price = function () {
                return this.workPrice * this.compute_units();
            };
            FoilModel.prototype.compute_copper_area = function () {
                var image = this.process.getImage();
                // 이미지 면적 X 페이지 수
                return image.getPages() * image.computeArea() * (this.__inkAreaPercentage / 100.0);
            };
            FoilModel.prototype.compute_copper_price = function () {
                // 한 판 동판비 = 200원 / cm^2
                return this.copperPrice * this.compute_copper_area() / 100.0; // mm^2 -> cm^2
            };
            FoilModel.prototype.compute_ink_area = function () {
                var image = this.process.getImage();
                // 총 면적 = 이미지 면적 * 페이지 수 * 사본수량
                var area = image.computeArea() * image.getCopies() * image.getPages() * (this.__inkAreaPercentage / 100.0);
                // 추후 단위를 mm^2 -> m^2 바꿔줘야 함
                return area;
            };
            FoilModel.prototype.compute_ink_price = function () {
                return (this.inkPrice * this.compute_ink_area()) / (1000.0 * 1000.0);
            };
            /* ---------------------------------------------------------
                GETTERS
            --------------------------------------------------------- */
            FoilModel.prototype.getWorkPrice = function () {
                return this.workPrice;
            };
            FoilModel.prototype.getWorkFaces = function () {
                return this.workFaces;
            };
            FoilModel.prototype.getCopperPrice = function () {
                return this.copperPrice;
            };
            FoilModel.prototype.getInkPrice = function () {
                return this.inkPrice;
            };
            FoilModel.prototype.$getInkAreaPercentage = function () {
                return this.__inkAreaPercentage;
            };
            /* ---------------------------------------------------------
                SETTERS
            --------------------------------------------------------- */
            FoilModel.prototype.setWorkPrice = function (val) {
                this.workPrice = val;
            };
            FoilModel.prototype.setWorkFaces = function (val) {
                this.workFaces = val;
            };
            FoilModel.prototype.setCopperPrice = function (val) {
                this.copperPrice = val;
            };
            FoilModel.prototype.setInkPrice = function (val) {
                this.inkPrice = val;
            };
            FoilModel.prototype.$setInkAreaPercentage = function (val) {
                this.__inkAreaPercentage = val;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            FoilModel.prototype.TAG = function () {
                return "foil";
            };
            /**
             * @inheritdoc
             */
            FoilModel.prototype.toGridRows = function () {
                if (this.isUsed() == false)
                    return [];
                var image = this.process.getImage();
                var rows = [
                    ////////
                    // 합계
                    ////////
                    {
                        name: "박",
                        price: this.computePrice(),
                        comment: "박비 = 작업비 + 동판비 + 박비"
                    },
                    ////////
                    // 작업비
                    ////////
                    {
                        name: "\t작업비",
                        sub_price: this.compute_work_price(),
                        comment: "작업비 = 작업단위 X 단위당작업비"
                    },
                    {
                        name: "\t\t작업단위",
                        comment: folding.library.StringUtil.substitute("({1} 판면 X {2} 부) / {3} 판면 = {4} 단위", folding.library.StringUtil.numberFormat(this.process.computeFaceCount()), folding.library.StringUtil.numberFormat(this.process.getImage().getCopies()), this.workFaces, folding.library.StringUtil.numberFormat(this.compute_units()))
                    }
                ].concat(this.toGridRows_units(), [
                    {
                        name: "\t\t단위당 작업비",
                        comment: folding.library.StringUtil.numberFormat(this.workPrice) + " 원"
                    },
                    ////////
                    // 동판비
                    ////////
                    {
                        name: "\t동판비",
                        sub_price: this.compute_copper_price(),
                        comment: "동판비 = 총면적 X 면적당동판비"
                    },
                    {
                        name: "\t\t총면적",
                        comment: folding.library.StringUtil.substitute("{1} mm^2 X {2} 페이지 X {3} % = {4} cm^2", folding.library.StringUtil.numberFormat(this.process.getImage().computeArea()), folding.library.StringUtil.numberFormat(this.process.getImage().getPages()), folding.library.StringUtil.numberFormat(this.__inkAreaPercentage), folding.library.StringUtil.numberFormat(this.compute_copper_area() / 100.0 // mm^2 -> cm^2
                        ))
                    },
                    {
                        name: "\t\t면적당 동판비",
                        comment: folding.library.StringUtil.numberFormat(this.copperPrice) + " 원 / cm^2"
                    },
                    ////////
                    // 박비
                    ////////
                    {
                        // 보다 상세히
                        name: "\t박비",
                        sub_price: this.compute_ink_price(),
                        comment: "박비 = 박 면적 X 면적당박비"
                    },
                    {
                        name: "\t\t박 면적",
                        comment: folding.library.StringUtil.substitute("{1} m^2 X {2} 부 = {3} m^2", folding.library.StringUtil.numberFormat(image.computeArea() * image.getPages()), folding.library.StringUtil.numberFormat(this.process.getImage().getCopies()), folding.library.StringUtil.numberFormat(this.compute_ink_area() / 1000 / 1000))
                    },
                    {
                        name: "\t\t면적당 작업비",
                        comment: folding.library.StringUtil.numberFormat(this.inkPrice) + " 원 / m^2"
                    }
                ]);
                return rows;
            };
            FoilModel.prototype.toGridRows_units = function () {
                var rows = [];
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    var units = placement.face_count() * Math.ceil(placement.computeCopies() / this.workFaces);
                    var row = {
                        name: folding.library.StringUtil.substitute("\t\t\t{1}. {2} x {3}", i + 1, folding.library.StringUtil.numberFormat(placement.getPaperSize().getWidth()), folding.library.StringUtil.numberFormat(placement.getPaperSize().getHeight())),
                        comment: folding.library.StringUtil.substitute("{1} 판면, {2} -> {3} 단위", folding.library.StringUtil.numberFormat(placement.face_count()), placement.$copies, 
                        //library.StringUtil.numberFormat(placement.computeCopies()),
                        folding.library.StringUtil.numberFormat(units))
                    };
                    rows.push(row);
                }
                return rows;
            };
            return FoilModel;
        }(folding.SideOptionalModel));
        folding.FoilModel = FoilModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * 공정 클래스.
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var Process = (function (_super) {
            __extends(Process, _super);
            function Process(arg) {
                _super.call(this);
                if (arg instanceof Process) {
                    ////////
                    // COPY
                    ////////
                    var obj = arg;
                    // MEMBERS
                    this.process_array = obj.process_array;
                    this.name = obj.name;
                    this.device = obj.device;
                    this.image = obj.image;
                    this.paper = obj.paper;
                    this.price_models = obj.price_models;
                    // ASIGN CHILDREN ELEMENTS
                    this.assign(obj.begin(), obj.end());
                }
                else {
                    this.process_array = arg;
                    this.name = "이름 없음";
                    this.device = new folding.Device();
                    this.image = new folding.Image();
                    this.price_models = new folding.PriceModels(this);
                    this.device.init();
                    this.image.init();
                    this.price_models.init();
                    if (this.process_array.getPaperArray().empty() == true)
                        this.paper = null;
                    else
                        this.paper = this.process_array.getPaperArray().front();
                }
            }
            /**
             * @inheritdoc
             */
            Process.prototype.construct = function (xml) {
                this.device.construct(xml.get(this.device.TAG()).front());
                this.image.construct(xml.get(this.image.TAG()).front());
                this.price_models.construct(xml.get(this.price_models.TAG()).front());
                if (xml.hasProperty("paper") == true) {
                    var paper_name = xml.getProperty("paper");
                    if (this.process_array.getPaperArray().has(paper_name) == true)
                        this.paper = this.process_array.getPaperArray().get(paper_name);
                    else
                        this.paper = null;
                }
                else
                    this.paper = null;
                _super.prototype.construct.call(this, xml);
            };
            /**
             * @inheritdoc
             */
            Process.prototype.createChild = function (xml) {
                return new folding.Placement(this);
            };
            /* ---------------------------------------------------------
                OPTIMIZER
            --------------------------------------------------------- */
            /**
             * 최적화를 행함
             */
            Process.prototype.optimize = function () {
                /////
                // 초기값 도출
                /////
                // 기존의 모든 조판내역을 지움
                this.clear();
                // 최적의 배치후보자 및 양단면 코드와 페이지 수
                var placements = this.compute_placements();
                var side = this.computeSide();
                var total_pages = this.getImage().getPages();
                /////
                // 최적 배치 도출
                /////
                // 탐색
                var folder = this.explore_placements(placements, side, total_pages);
                // 도출된 최적 배치 리스트를 현재의 Folder에 할당한다
                this.assign(folder.begin(), folder.end());
            };
            /**
             * 최적의 배치를 탐색함.
             *
             * @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
             * @param side 양단면 코드
             * @param left_pages 배치가 완료되지 않은 잔여 페이지
             * @param first 탐색을 시작할 첫 조편만의 반복자 (탐색범위 내 가장 큰 조판)
             *
             * @return 최소비용을 지니는 Folder 모형
             */
            Process.prototype.explore_placements = function (placements, side, left_pages, first) {
                if (first === void 0) { first = null; }
                // 모든 페이지의 배치가 끝낫다.
                if (left_pages == 0)
                    return this;
                if (left_pages == 1) {
                    console.log("Last one");
                }
                // 안전장치 - 0개의 이미지를 지니는 판면 제거
                this.erase_empty_placements();
                //========
                // 가능한 판 배치 중, 최소 비용을 찾는다 -> 즉, 모든 iteration을 다 돌아봐야 함을 의미
                //========
                var candidate_solutions = new std.Vector();
                if (first == null)
                    first = placements.lower_bound(left_pages); // 사용 가능한 최대 크기
                // 가능한 모든 배치 후보군 中에서...
                for (var it = first; !it.equal_to(placements.end()); it = it.next()) {
                    var quota = left_pages / it.second.max_image_count();
                    var face_count = Math.floor(quota);
                    if (quota == face_count) {
                        //--------
                        // 나누어 떨어짐. 현재의 판에 모두 조판 가능
                        //--------
                        // 현재의 배치방법대로 조판 모형을 생성하고, 부수를 설정함
                        var placement = new folding.Placement(it.second);
                        placement.allocate(placement.max_image_count(), face_count);
                        // 현재의 조판 모형을 추가
                        var my_solution = new Process(this);
                        my_solution.push_back(placement);
                        // 후보안 추가 - 현 조판안 + 판걸이
                        candidate_solutions.push_back(my_solution);
                        candidate_solutions.push_back(my_solution.explore_plaste_placements(placements, side, 0));
                        // 양면 조판에 홀수 판면수가 나오는 경우, 대안을 사용한다. 
                        //	- 대안 탐색이 아닌 대치
                        //	- 대안 또한 유효성 검증을 거쳐 통과해야 함
                        if (my_solution.validate() == false) {
                            // 대안 도출
                            //	1. 차감 후 추가 탐색
                            //	2. 돈땡
                            candidate_solutions.push(my_solution.explore_subtract_placements(placements, 0), my_solution.explore_inverse_placements(placements, 0));
                        }
                    }
                    else {
                        //--------
                        // 나누어 떨어지지 않음. 현재의 판에 모두 조판 불가
                        //	- 보다 작은 판에 조판을 수행하던가
                        //	- 아니면, 나머지가 남는 걸 감수하고 현재 판에 그대로 조판함
                        //	- 양면의 경우, 돈땡도 고려할 수 있다
                        //--------
                        // 내림을 행함
                        var remainder = left_pages % it.second.max_image_count();
                        // 나머지분을 제외한 이미지에 한하여 
                        // 현재의 배치방법대로 조판 모형을 생성하고, (내림된) 부수를 설정함
                        var placement = new folding.Placement(it.second);
                        placement.allocate(placement.max_image_count(), face_count);
                        // 현재의 조판 모형을 추가
                        var pre_solution = new Process(this);
                        pre_solution.push_back(placement);
                        // 판걸이를 행한 조판을 후보군에 등록
                        if (placement.max_image_count() < 8)
                            candidate_solutions.push_back(pre_solution.explore_plaste_placements(placements, side, remainder));
                        /////
                        // 첫째, 올림하여 빈 공간이 생기는 걸 감수하고 배치하는 경우
                        /////
                        var ceiled_solution = new Process(pre_solution);
                        {
                            // 마지막 조판에 대한 사본으로 대치
                            // 불필요한 Link가 남는 것을 막기 위함이다
                            var last_placement = ceiled_solution.back();
                            ceiled_solution.pop_back();
                            ceiled_solution.push_back(new folding.Placement(last_placement));
                            // 여백을 인정하는 나머지 조판을 행하고
                            var reminader_placement = new folding.Placement(it.second);
                            reminader_placement.allocate(remainder, 1);
                            // 이전 조판과 현재의 나머지 조판 사이에 연결관계를 맺어준다
                            ceiled_solution.back()["link"] = reminader_placement;
                            reminader_placement["link"] = ceiled_solution.back();
                            // 그 후 올림 솔루션에 추가
                            ceiled_solution.push(reminader_placement);
                            // 올림 솔루션을 후보 솔루션군에 추가
                            candidate_solutions.push(ceiled_solution);
                            // 올림 솔루션에 대한 판걸이 또한 후보군에 등록
                            candidate_solutions.push_back(ceiled_solution.explore_plaste_placements(placements, side, 0));
                        }
                        /////
                        // 둘째, 나머지는 다른 종류의 판으로 싸는 경우; 계속 탐색을 수행함
                        /////
                        var explored_solution = pre_solution.explore_placements(placements, side, remainder);
                        {
                            // 나머지 탐색 솔루션도 후보 솔루션군에 추가함
                            candidate_solutions.push(explored_solution);
                            if (side == 2)
                                candidate_solutions.push(pre_solution.explore_subtract_placements(placements, remainder), pre_solution.explore_inverse_placements(placements, remainder));
                        }
                    }
                }
                //========
                // 후보군 중 최소 비용을 찾음
                //========
                var best = null;
                for (var i = 0; i < candidate_solutions.length; i++) {
                    if (candidate_solutions[i] == null)
                        continue;
                    // 안전장치 - 0개의 이미지를 지니는 판면 제거
                    candidate_solutions[i].erase_empty_placements();
                    // 양면조판의 경우, 유효하지 않은 배치가 생길 수 있다.
                    if (candidate_solutions[i].validate() == false)
                        continue;
                    if (best == null || candidate_solutions[i].computePrice() < best.computePrice())
                        best = candidate_solutions[i];
                }
                // 최적 조판안 리턴
                return best;
            };
            /**
             * 홀수 판면을 제거하고 더 작은 단위로 분할하는 대안을 찾음.
             *
             * @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
             * @param left_pages 배치가 완료되지 않은 잔여 페이지
             *
             * @return 최소비용을 지니는 Folder 모형
             */
            Process.prototype.explore_subtract_placements = function (placements, left_pages) {
                var last_placement = this.back();
                // 조판 수가 짝수거나, 홀수더라도 가장 작은 조판에 대하여 행한 것이라면, PASS
                if (last_placement.face_count() % 2 == 0)
                    return null;
                // 판수를 하나 차감하는 조판을 행한다
                var alter_placement = new folding.Placement(last_placement);
                alter_placement.allocate(last_placement.image_count(), last_placement.face_count() - 1);
                // 대체 해 구성
                var alter_solution = new Process(this);
                alter_solution.pop_back();
                if (alter_placement.face_count() != 0)
                    alter_solution.push_back(alter_placement);
                // 대체 해로 인해 생긴 나머지와, iteration 제약조건를 가지고
                var alter_left_pages = left_pages + last_placement.image_count();
                var alter_last_it = placements.find(last_placement.max_image_count());
                // 추가적인 조판 탐색을 수행
                alter_solution = alter_solution.explore_placements(placements, 2, alter_left_pages, alter_last_it.next());
                if (alter_solution != null)
                    alter_solution.erase_empty_placements();
                return alter_solution;
            };
            /**
             * <p> 대안 탐색 - 돈땡. </p>
             *
             * <p> 돈땡이 가능한 지 검사하고, 가능시 기존의 조판을 돈땡으로 바꾼 후, 추가적인 탐색을 수행한다. </p>
             *
             * @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
             * @param left_pages 배치가 완료되지 않은 잔여 페이지
             *
             * @return 최소비용을 지니는 Folder 모형
             */
            Process.prototype.explore_inverse_placements = function (placements, left_pages) {
                // 양면이 아니거나, 부수가 1부뿐이면 돈땡을 행할 수 없다
                if (this.computeSide() == 1 || this.image.getCopies() == 1)
                    return null;
                // 돈땡을 행하려거든, 마지막 조판이
                var last_placement = this.back();
                if (last_placement.face_count() % 2 == 0)
                    return null;
                else if (last_placement.getLink() != null && (last_placement.face_count() + last_placement.getLink().face_count()) % 2 == 0) {
                    // link와의 합이 짝수여서도 안 된다
                    return null;
                }
                //////
                // 돈땡 조판 실시.
                //////
                // 마지막 판면을 차감
                var subtracted_placement = new folding.Placement(last_placement);
                subtracted_placement["face_count_"]--;
                // 돈땡을 행하는 판면(만)을 가지는 배치 수행
                var inversed_placement = new folding.Placement(last_placement);
                inversed_placement["face_count_"] = 1;
                inversed_placement["inverse_count_"] = 2;
                // 대체 접지모형 구성
                var alternative = new Process(this);
                alternative.pop_back(); // last_placement 제거
                if (subtracted_placement.face_count() != 0)
                    alternative.push_back(subtracted_placement);
                alternative.push_back(inversed_placement);
                //////
                // 돈땡 + 판걸이
                //////
                var plasted = null;
                if (inversed_placement.max_image_count() != 8) {
                    plasted = new Process(alternative);
                    plasted = plasted.explore_plaste_placements(placements, 2, left_pages);
                }
                // 추가 탐색 수행
                alternative = alternative.explore_placements(placements, 2, left_pages);
                // 돈땡 + 판걸이를 적용할 것인가
                if (plasted != null && plasted.validate() == true)
                    if (alternative == null || alternative.validate() == false)
                        alternative = plasted;
                    else if (plasted.computePrice() < alternative.computePrice())
                        alternative = plasted;
                return alternative;
            };
            /**
             * <p> 대안 탐색 - 판걸이. </p>
             *
             * <p> 판걸이가 가능한 지 검사하고, 가능시 기존의 조판을 판걸이로 바꾼 후, 추가적인 탐색을 수행한다.
             * </p>
             *
             * @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
             * @param left_pages 배치가 완료되지 않은 잔여 페이지
             *
             * @return 최소비용을 지니는 Folder 모형
             */
            Process.prototype.explore_plaste_placements = function (placements, side, left_pages) {
                // 판걸이를 행하려거든, 마지막 조판이
                var last_placement = this.back();
                if (last_placement.max_image_count() == 8)
                    return null;
                //////
                // 판걸이 조판 실시.
                //////
                // 가능한 모든 배수를 다 검사한다.
                var best = null;
                for (var multiplier = 2; multiplier <= this.image.getCopies() // 판걸이 배수가 사분 부수보다 반드시 작아야 하고
                    && last_placement.max_image_count() * multiplier <= 8; multiplier *= 2) {
                    /////
                    // 더 큰 조판을 생성
                    ////
                    var my_placement = new folding.Placement(last_placement);
                    // 배치 최적리스트 中 N 배수의 조판 샘플을 사용해, 대안 조판을 확장
                    my_placement.set_plaste(placements.get(last_placement.max_image_count() * multiplier));
                    ////
                    // 새 대안 생성
                    ////
                    var my_folder = new Process(this);
                    my_folder.pop_back();
                    my_folder.push_back(my_placement);
                    // 탐색
                    my_folder = my_folder.explore_placements(placements, side, left_pages);
                    // best 와 비교하여 대치
                    if (my_folder == null || my_folder.validate() == false)
                        continue;
                    else if (best == null || my_folder.computePrice() < best.computePrice())
                        best = my_folder;
                }
                return best;
            };
            /**
             * 이미지 배치가 없는 조판을 지움.
             *
             * 대개 하나의 이미지도 올리지 않는 빈 조판은 생기지 않는다.
             * 다만, 계산의 안정성을 위해서 추가된 메소드임.
             */
            Process.prototype.erase_empty_placements = function () {
                std.remove_if(this.begin(), this.end(), function (placement) {
                    return placement.face_count() == 0;
                });
            };
            /* ---------------------------------------------------------
                ACCESSORS
                    - MEMBERS
                    - COMPUTATORS
                    - GRID PROPERTIES
            ============================================================
                MEMBERS
            --------------------------------------------------------- */
            Process.prototype.getProcessArray = function () {
                return this.process_array;
            };
            /**
             * Get 오프셋 장치.
             */
            Process.prototype.getDevice = function () {
                return this.device;
            };
            /**
             * Get 이미지.
             */
            Process.prototype.getImage = function () {
                return this.image;
            };
            /**
             * Get 용지 리스트.
             */
            Process.prototype.getPaper = function () {
                return this.paper;
            };
            /**
             * Get 가격모형 리스트.
             */
            Process.prototype.getPriceModels = function () {
                return this.price_models;
            };
            /**
             * 접지에 사용할 용지를 정함.
             */
            Process.prototype.setPaper = function (val) {
                this.paper = val;
            };
            /* ---------------------------------------------------------
                COMPUTATORS
            --------------------------------------------------------- */
            /**
             * 배치 방법을 계산함.
             *
             * @return 같은 이미지 수를 가지는 각 판의 배치방법 중 최고 면적활용도를 지닌 배치방법의 리스트.
             */
            Process.prototype.compute_placements = function () {
                var placements = new std.TreeMap(std.greater);
                for (var i = 0; i < this.paper.size(); i++) {
                    // 배치 구성
                    var placement = new folding.Placement(this, this.paper.at(i));
                    if (placement.max_image_count() == 0)
                        continue; // 단 한 장의 이미지도 넣을 수 없을만큼 작은 용지이다
                    // 현재와 같은 최대의 이미지 수를 넣을 수 있는 조판을 찾음
                    var it = placements.find(placement.max_image_count());
                    if (it.equal_to(placements.end()) == true)
                        placements.insert([placement.max_image_count(), placement]); // 없으면, 등록
                    else {
                        // 같은 수의 이미지를 넣을 수 있는 조판이 있다면,
                        // 공간 활용률이 높은 쪽을 남긴다 (아무래도 더 작은 종이, 효율이 높음)
                        if (placement.computeSpaceUtilizationRatio() > it.second.computeSpaceUtilizationRatio())
                            it.second = placement;
                    }
                }
                return placements;
            };
            /**
             * 유효성 검증.
             */
            Process.prototype.validate = function () {
                var side = this.computeSide();
                if (side == 1)
                    return true;
                return std.all_of(this.begin(), this.end(), function (placement) {
                    return placement.validate(side);
                });
            };
            /**
             * <p> 현 조판 공정의 양-단면 여부를 계산함. </p>
             *
             * <p> 적용하는 모든 공정이 양면이어야 양면으로 간주된다. 단 하나라도 단면이면, 단면 공정으로 간주. </p>
             *
             * @return 양단면 코드.
             */
            Process.prototype.computeSide = function () {
                var side = 2;
                var side_candidates = [
                    this.price_models.getPrint(),
                    this.price_models.getFoil(),
                    this.price_models.getScodix()
                ];
                for (var i = 0; i < side_candidates.length; i++)
                    if (side_candidates[i].isUsed() == true && side_candidates[i].getSide() == 1) {
                        side = 1;
                        break;
                    }
                return side;
            };
            /**
             * 최종 가격을 계산함.
             */
            Process.prototype.computePrice = function () {
                return this.price_models.computePrice();
            };
            /**
             * 사용하게 될 판면의 수
             *
             * 한 부 내에서 쓰이는 판면 수만을 의미한다.
             * 전체 사본 부수와 돈땡 및 판걸이를 반영한 판면 수가 아님.
             */
            Process.prototype.computeFaceCount = function () {
                var count = 0;
                for (var i = 0; i < this.size(); i++)
                    count += this.at(i).face_count();
                return count;
            };
            Object.defineProperty(Process.prototype, "$name", {
                /* ---------------------------------------------------------
                    GRID PROPERTIES
                --------------------------------------------------------- */
                get: function () {
                    return this.name;
                },
                set: function (val) {
                    this.name = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Process.prototype, "$page", {
                get: function () {
                    return folding.library.StringUtil.numberFormat(this.getImage().getPages()) + " 쪽";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Process.prototype, "$copies", {
                get: function () {
                    return folding.library.StringUtil.numberFormat(this.getImage().getCopies()) + " 부";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Process.prototype, "$price", {
                get: function () {
                    return folding.library.StringUtil.numberFormat(this.computePrice()) + " 원";
                },
                enumerable: true,
                configurable: true
            });
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Process.prototype.TAG = function () {
                return "process";
            };
            /**
             * @inheritdoc
             */
            Process.prototype.CHILD_TAG = function () {
                return "placement";
            };
            /**
             * @inheritdoc
             */
            Process.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.clear(); // Placement와 Wrap 정보까지는 저장치 않도록 한다
                xml.push(this.device.toXML());
                xml.push(this.image.toXML());
                xml.push(this.price_models.toXML());
                if (this.paper != null)
                    xml.setProperty("paper", this.paper.key());
                return xml;
            };
            return Process;
        }(folding.protocol.EntityArray));
        folding.Process = Process;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 종이모형 리스트. </p>
         *
         * <p> 종이모형 편집기, 데이터 그리드에 각 종이모형을 표기하기 위한 데이터 프로바이더 컬렉션이다. </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var PaperModelArray = (function (_super) {
            __extends(PaperModelArray, _super);
            function PaperModelArray() {
                _super.apply(this, arguments);
            }
            ////////
            // 현재 보류된 내역
            ////////
            ///**
            // * 단위당 재단비용; 재단비용 / 단위
            // */
            //private cutting_price: number;
            ///**
            // * 재단비용 단위
            // */
            //private cutting_unit: number;
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            // using super::constructor
            /**
             * @inheritdoc
             */
            PaperModelArray.prototype.init = function () {
                // 현 리스트에 초기화된 모형 하나만
                var paper = new folding.PaperModel();
                paper.init();
                // 유지한다
                this.clear();
                this.push_back(paper);
            };
            /**
             * @inheritdoc
             */
            PaperModelArray.prototype.createChild = function (xml) {
                return new folding.PaperModel();
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PaperModelArray.prototype.TAG = function () {
                return "paperArray";
            };
            /**
             * @inheritdoc
             */
            PaperModelArray.prototype.CHILD_TAG = function () {
                return "paper";
            };
            return PaperModelArray;
        }(folding.protocol.EntityArrayCollection));
        folding.PaperModelArray = PaperModelArray;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var ProcessArray = (function (_super) {
            __extends(ProcessArray, _super);
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function ProcessArray() {
                _super.call(this);
                this.paper_array = new folding.PaperModelArray();
                this.paper_array.init();
            }
            /**
             * @inheritdoc
             */
            ProcessArray.prototype.construct = function (xml) {
                this.paper_array.construct(xml.get(this.paper_array.TAG()).front());
                _super.prototype.construct.call(this, xml);
            };
            /**
             * @inheritdoc
             */
            ProcessArray.prototype.createChild = function (xml) {
                return new folding.Process(this);
            };
            /* ---------------------------------------------------------
                PROCEDURES
            --------------------------------------------------------- */
            ProcessArray.prototype.init = function () {
                this.clear();
                this.push_back(new folding.Process(this));
            };
            ProcessArray.prototype.optimize = function () {
                for (var i = 0; i < this.size(); i++)
                    this.at(i).optimize();
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            ProcessArray.prototype.getPaperArray = function () {
                return this.paper_array;
            };
            ProcessArray.prototype.computePrice = function () {
                var price = 0;
                for (var i = 0; i < this.size(); i++)
                    price += this.at(i).computePrice();
                return price;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ProcessArray.prototype.TAG = function () {
                return "processArray";
            };
            /**
             * @inheritdoc
             */
            ProcessArray.prototype.CHILD_TAG = function () {
                return "process";
            };
            /**
             * @inheritdoc
             */
            ProcessArray.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                xml.push(this.paper_array.toXML());
                return xml;
            };
            return ProcessArray;
        }(folding.protocol.EntityArrayCollection));
        folding.ProcessArray = ProcessArray;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var ProcessEditor = (function (_super) {
            __extends(ProcessEditor, _super);
            function ProcessEditor() {
                _super.apply(this, arguments);
            }
            ProcessEditor.prototype.render = function () {
                if (this.props.process == null)
                    return React.createElement("p", null, " 아무 공정도 선택되지 않았습니다. ");
                return React.createElement("div", null, React.createElement(flex.TabNavigator, {style: { width: 525, height: "100%", float: "left" }}, React.createElement(flex.NavigatorContent, {label: "Item Editor"}, React.createElement(folding.ItemEditor, {process: this.props.process, paperArray: this.props.process.getProcessArray().getPaperArray()})), React.createElement(flex.NavigatorContent, {label: "Price Model"}, React.createElement(folding.PriceModelEditor, {priceModels: this.props.process.getPriceModels()}))));
            };
            return ProcessEditor;
        }(React.Component));
        folding.ProcessEditor = ProcessEditor;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var ItemEditor = (function (_super) {
            __extends(ItemEditor, _super);
            function ItemEditor() {
                _super.apply(this, arguments);
                this.selected_paper_index = 0;
                this.selected_paper_size_index = -1;
            }
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            ItemEditor.prototype.change_member_value = function (setter, event) {
                var value = Number(event.target.value);
                setter(value);
            };
            Object.defineProperty(ItemEditor.prototype, "selected_paper", {
                get: function () {
                    try {
                        return this.props.paperArray.at(this.selected_paper_index);
                    }
                    catch (exception) {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ItemEditor.prototype, "selected_paper_size", {
                get: function () {
                    try {
                        return this.selected_paper.at(this.selected_paper_size_index);
                    }
                    catch (exception) {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ItemEditor.prototype.get_paper_row = function (index) {
                try {
                    return this.props.paperArray.at(index);
                }
                catch (exception) {
                    return null;
                }
            };
            ItemEditor.prototype.get_paper_size_row = function (index) {
                try {
                    return this.selected_paper.at(index);
                }
                catch (exception) {
                    return null;
                }
            };
            /* =========================================================
                GRID HANDLERS
                    - ROW ACCESSORS
                    - ELEMENTS I/O
            ============================================================
                ROW ACCESSORS
            --------------------------------------------------------- */
            ItemEditor.prototype.handle_paper_select = function (event) {
                try {
                    this.selected_paper_index = event.rowIdx;
                    this.props.process.setPaper(this.selected_paper);
                    this.refresh();
                }
                catch (exception) { }
            };
            ItemEditor.prototype.handle_paper_updated = function (event) {
                Object["assign"](this.selected_paper, event.updated);
                this.props.paperArray.refresh(this.props.paperArray.begin().advance(event.rowIdx));
            };
            ItemEditor.prototype.handle_paper_size_select = function (event) {
                this.selected_paper_size_index = event.rowIdx;
            };
            ItemEditor.prototype.handle_paper_size_updated = function (event) {
                Object["assign"](this.selected_paper_size, event.updated);
                this.selected_paper.refresh(this.selected_paper.begin().advance(event.rowIdx));
            };
            /* ---------------------------------------------------------
                ELEMENTS I/O
            --------------------------------------------------------- */
            ItemEditor.prototype.handle_collection_event = function (event) {
                // Array 컨테이너의 collection 이벤트 발생은 선행적임.
                // setTimeout 을 통하여, elements i/o 연산이 이뤄진 후에 refresh 가 불러지게끔 한다.
                setTimeout(this.refresh.bind(this), 0);
            };
            ItemEditor.prototype.insert_paper = function (event) {
                this.props.paperArray.push_back(new folding.PaperModel());
            };
            ItemEditor.prototype.erase_paper = function (event) {
                try {
                    var it = this.props.paperArray.begin().advance(this.selected_paper_index);
                    this.props.paperArray.erase(it);
                }
                catch (exception) { }
            };
            ItemEditor.prototype.insert_paper_size = function (event) {
                try {
                    this.selected_paper.push_back(new folding.PaperSize());
                    this.refresh();
                }
                catch (exception) { }
            };
            ItemEditor.prototype.erase_paper_size = function (event) {
                try {
                    var it = this.selected_paper.begin().advance(this.selected_paper_size_index);
                    this.selected_paper.erase(it);
                    this.refresh();
                }
                catch (exception) { }
            };
            /* ---------------------------------------------------------
                RENDERERS
            --------------------------------------------------------- */
            ItemEditor.prototype.refresh = function () {
                var device_editor_div = document.getElementById("device_editor_div");
                var image_editor_div = document.getElementById("image_editor_div");
                if (!device_editor_div)
                    return;
                // REFRESH DATA GRID
                this.setState({});
                // CLEAR ORDINARY CONTENT
                if (device_editor_div.children.length != 0)
                    device_editor_div.removeChild(device_editor_div.children[0]);
                if (image_editor_div.children.length != 0)
                    image_editor_div.removeChild(image_editor_div.children[0]);
                // INSERT REFRESHED ITEMS
                ReactDOM.render(this.render_device_editor(), device_editor_div);
                ReactDOM.render(this.render_image_editor(), image_editor_div);
            };
            ItemEditor.prototype.render = function () {
                return React.createElement("div", {id: "item_editor_div"}, React.createElement("div", {id: "device_editor_div"}, this.render_device_editor()), React.createElement("div", {id: "image_editor_div"}, this.render_image_editor()), React.createElement("div", {id: "paper_editor_div"}, this.render_paper_editor(), this.render_paper_size_editor()));
            };
            ItemEditor.prototype.render_device_editor = function () {
                var device = this.props.process.getDevice();
                return React.createElement("div", null, React.createElement("h2", null, " 오프셋 장치 정보 "), React.createElement("ul", null, React.createElement("li", null, " 구와이", React.createElement("ul", null, React.createElement("li", null, " 길이:", React.createElement("input", {type: "number", defaultValue: device.getBited(), onChange: this.change_member_value.bind(this, device.setBited.bind(device))})), React.createElement("li", null, " 방향:", React.createElement("select", {onChange: this.change_member_value.bind(this, device.setBitedDirection.bind(device))}, React.createElement("option", {value: false, selected: device.getBitedDirection() == false}, "가로"), React.createElement("option", {value: true, selected: device.getBitedDirection() == true}, "세로"))))), React.createElement("li", null, " 인쇄 불가능 영역", React.createElement("ul", null, React.createElement("li", null, " 가로:", React.createElement("input", {type: "number", defaultValue: device.getNonPrintableWidth(), onChange: this.change_member_value.bind(this, device.setNonPrintableWidth.bind(device))})), React.createElement("li", null, " 세로:", React.createElement("input", {type: "number", defaultValue: device.getNonPrintableHeight(), onChange: this.change_member_value.bind(this, device.setNonPrintableHeight.bind(device))}))))));
            };
            ItemEditor.prototype.render_image_editor = function () {
                var image = this.props.process.getImage();
                return React.createElement("div", null, React.createElement("h2", null, " 이미지 정보 "), React.createElement("ul", null, React.createElement("li", null, " 가로 길이:", React.createElement("input", {type: "number", defaultValue: image.getWidth(), onChange: this.change_member_value.bind(this, image.setWidth.bind(image))}), " mm"), React.createElement("li", null, " 세로 길이:", React.createElement("input", {type: "number", defaultValue: image.getHeight(), onChange: this.change_member_value.bind(this, image.setHeight.bind(image))}), " mm"), React.createElement("li", null, " 페이지 수:", React.createElement("input", {type: "number", defaultValue: image.getPages(), onChange: this.change_member_value.bind(this, image.setPages.bind(image))}), " 페이지"), React.createElement("li", null, " 사본:", React.createElement("input", {type: "number", defaultValue: image.getCopies(), onChange: this.change_member_value.bind(this, image.setCopies.bind(image))}), " 부"), React.createElement("li", null, " 여백:", React.createElement("input", {type: "number", defaultValue: image.getMargin(), onChange: this.change_member_value.bind(this, image.setMargin.bind(image))}), " mm")));
            };
            ItemEditor.prototype.render_paper_editor = function () {
                var columns = [
                    { key: "$name", name: "이름", editable: true, width: 225 },
                    { key: "$price", name: "가격 / m^2", editable: true, width: 225 }
                ];
                if (this.props.paperArray.hasEventListener("insert") == false) {
                    this.props.paperArray.addEventListener("insert", this.handle_collection_event, this);
                    this.props.paperArray.addEventListener("erase", this.handle_collection_event, this);
                    this.props.paperArray.addEventListener("refresh", this.handle_collection_event, this);
                }
                return React.createElement("div", null, React.createElement("h2", null, " 용지 종류 "), React.createElement(ReactDataGrid, {ref: "paper_grid", rowGetter: this.get_paper_row.bind(this), rowsCount: this.props.paperArray.size(), columns: columns, onCellSelected: this.handle_paper_select.bind(this), onRowUpdated: this.handle_paper_updated.bind(this), enableCellSelect: true, minHeight: 40 + this.props.paperArray.size() * 35}), React.createElement("p", {style: { textAlign: "right" }}, React.createElement("button", {onClick: this.insert_paper.bind(this)}, " 추가 "), React.createElement("button", {onClick: this.erase_paper.bind(this)}, " 삭제 ")));
            };
            ItemEditor.prototype.render_paper_size_editor = function () {
                var columns = [
                    { key: "$width", name: "가로", editable: true, width: 225 },
                    { key: "$height", name: "세로", editable: true, width: 225 }
                ];
                return React.createElement("div", null, React.createElement("h2", null, " 용지 크기 "), React.createElement(ReactDataGrid, {ref: "paper_size_grid", rowGetter: this.get_paper_size_row.bind(this), rowsCount: this.selected_paper == null ? 0 : this.selected_paper.size(), columns: columns, onCellSelected: this.handle_paper_size_select.bind(this), onRowUpdated: this.handle_paper_size_updated.bind(this), enableCellSelect: true, minHeight: 40 + (this.selected_paper == null ? 0 : this.selected_paper.size() * 35)}), React.createElement("p", {style: { textAlign: "right" }}, React.createElement("button", {onClick: this.insert_paper_size.bind(this)}, " 추가 "), React.createElement("button", {onClick: this.erase_paper_size.bind(this)}, " 삭제 ")));
            };
            return ItemEditor;
        }(React.Component));
        folding.ItemEditor = ItemEditor;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 라미네이팅 코팅 모형. </p>
         *
         * <ol>
         *	<li> 작업비 </li>
         *	<ul>
         *		<li> 기본 요금 25,000원. 200면까지. </li>
         *		<li> 200면을 초과하는 면수부터는 필름 코팅비를 사용 </li>
         *	</ul>
         *	<li> 필름 코팅비 </li>
         *	<ul>
         *		<li> 초과용지면적 (m<sup>2</sup>) X 200 원 / m<sup>2</sup> </li>
         *		<li> 라미네티잉으로 코팅 가능한 종이는 크기에 다른 공정에 비해 한계가 빠르다. </li>
         *		<li>
         *			이러한 사용가능 종이와 같은 정보는, 장치 ({@link Device}) 에 종속된다. 라미네이팅 공정을
         *			적용하는 데 있어, {@link Device} 정보를, 일반 오프셋 장비의 것으로 하는 실수를 조심토록 한다.
         *		</li>
         *	</ul>
         * </ol>
         *
         * <h3> 비고 </h3>
         * <ul>
         *	<li> 라미네이팅은 각 조판면이 아닌, 각 용지크기별로 단위를 매긴다. </li>
         *	<li>
         *		양/단면 선택 가능. 단, 여타 공정이 단면이되, 현재의 라미네이텡이 양면일 경우, 라미네이팅 용지는 총 면수의
         *		2배수를 필요로 하게 된다 (50장을 단면으로 썼는데, 코팅이 양면이면 100면의 코팅이 필요하기 때문임).
         *	</li>
         *	<li> 여유 용지: 각 종이크기당 30 매 </li>
         * </ul>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var LaminatingModel = (function (_super) {
            __extends(LaminatingModel, _super);
            function LaminatingModel() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            // using super::constructor
            /**
             * @inheritdoc
             */
            LaminatingModel.prototype.init = function () {
                // BASE MEMBERS
                this.used = false;
                this.side = 2;
                this.sparePapers = 30;
                // SPECIFIED MEMBERS
                this.basePrice = 25000;
                this.baseFaces = 200;
                this.filmPrice = 200;
            };
            /* =========================================================
                ACCESSROS
                    - COMPUTES
                    - GETTERS
                    - SETTERS
            ============================================================
                COMPUTES
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            LaminatingModel.prototype.computePrice = function () {
                if (this.isUsed() == false)
                    return 0;
                // 라미네이팅 가격 = 기본금 + 추가비용
                return this.compute_base_price() + this.compute_over_price();
            };
            /**
             * <p> 각 유닛 (종이 크기에 따른 면 수) 을 계산함. </p>
             *
             * <p> 각 종이 크기 별로, 사용된 총 면수를 구하여 해쉬맵의 형태로 리턴한다. (key: 종이 크기를 대표하는
             * aperSize 객체, value: 해당 종이 크기 (PaperSize) 로 조판되는 총 면 수). </p>
             *
             * <p> 각 용지크기당 사용된 총 면 수를 구하면 되나, 예외가 있다. 여타 공정이 단면이되, 현재의 라미네이텡이
             * 양면일 경우, 라미네이팅 용지는 총 면수의 2배수를 필요로 하게 된다 (50장을 단면으로 썼는데, 코팅이 양면이면
             * 100면의 코팅이 필요하기 때문임). 그리고 이 때, 리턴되는 해쉬맵의 value 값에는 전부 2가 곱해지게 된다. </p>
             *
             * @param this.process 접지 행위자
             * @return 각 유닛에 대한 컨테이너 (key: 종이 크기, value: 사용된 면 수)
             */
            LaminatingModel.prototype.compute_units = function () {
                ////////
                // 2 배수가 필요한 지 검사
                ////////
                // 여타 공정에 단면이 적용되었으나, 현재의 라미네이팅 공정이 양면일 경우
                // 코팅해야 할 면의 수는 2배수가 되어야 함
                var models = this.process.getPriceModels();
                var candidates = new std.Vector([models.getPrint(), models.getFoil(), models.getScodix()]);
                var multiplier = this.getSide() == 2 &&
                    std.any_of // 다른 공정이 단면일 때,
                    (candidates.begin(), candidates.end(), function (model) {
                        return model.isUsed() == true && model.getSide() == 1;
                    }) ? 2 : 1; // 2배수 증가. 그게 아니면, 현재 면수대로 사용
                ////////
                // 각 용지 종류별로, 사용한 면의 수를 계산함
                ////////
                // 용지별 면수를 담은 HashMap
                var units = new std.HashMap();
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    var my_paper = placement.getPaperSize();
                    // 현재 사용한 면의 수 = 조판의 면수 X (조정된) 사본
                    var my_face_count = placement.face_count() * placement.computeCopies();
                    my_face_count *= multiplier; // 증가자
                    // 현재의 종이 크기가 이미 기록되었는가
                    var it = units.find(my_paper);
                    if (it.equal_to(units.end()) == true)
                        units.insert([my_paper, my_face_count]);
                    else
                        it.second += my_face_count;
                }
                return units;
            };
            /**
             * 기본가격을 계산함.
             *
             * @param this.process 접지행위자
             * @return 기본가격
             */
            LaminatingModel.prototype.compute_base_price = function () {
                // 기본가격 X 유닛 수
                return this.basePrice * this.compute_units().size();
            };
            /**
             * 기본요금구간을 벗어난, 추가비용을 계산한다.
             *
             * @param this.process 접지행위자.
             * @return 초과요금
             */
            LaminatingModel.prototype.compute_over_price = function () {
                // 추가 비용 = 필름가 X 추가면적 (m^2)
                return this.filmPrice * (this.compute_over_area() / 1000 / 1000);
            };
            /**
             * 기본요금구간 면수를 벗어난, 초과면의 면적을 계산한다.
             *
             * @param this.process 접지행위자
             * @return 초과면적 총합
             */
            LaminatingModel.prototype.compute_over_area = function () {
                ////////
                // 초과 면적을 계산한다
                ////////
                var over_area = 0.0; // 초과 면적
                var units = this.compute_units(); // 각 크기당 사용 면수
                for (var it = units.begin(); !it.equal_to(units.end()); it = it.next()) {
                    var over_faces = Math.max(0, it.second - this.baseFaces);
                    over_area += over_faces * it.first.computeArea();
                }
                return over_area;
            };
            /**
             * @inheritdoc
             */
            LaminatingModel.prototype.compute_spare_area = function () {
                if (this.isUsed() == false)
                    return 0;
                var area = 0.0;
                // 용지별 면수를 담은 HashMap
                var units = this.compute_units();
                for (var it = units.begin(); !it.equal_to(units.end()); it = it.next()) {
                    var paper_size = it.first; // 현재의 종이 크기에 대하여
                    area += this.sparePapers * paper_size.computeArea(); // 여분지 수와 면적을 곱해 더함
                }
                return area;
            };
            /* ---------------------------------------------------------
                GETTERS
            --------------------------------------------------------- */
            LaminatingModel.prototype.getBasePrice = function () {
                return this.basePrice;
            };
            LaminatingModel.prototype.getBaseFaces = function () {
                return this.baseFaces;
            };
            LaminatingModel.prototype.getInkPrice = function () {
                return this.filmPrice;
            };
            /* ---------------------------------------------------------
                SETTERS
            --------------------------------------------------------- */
            LaminatingModel.prototype.setBasePrice = function (val) {
                this.basePrice = val;
            };
            LaminatingModel.prototype.setBaseFaces = function (val) {
                this.baseFaces = val;
            };
            LaminatingModel.prototype.setInkPrice = function (val) {
                this.filmPrice = val;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            LaminatingModel.prototype.TAG = function () {
                return "laminating";
            };
            /**
             * @inheritdoc
             */
            LaminatingModel.prototype.toGridRows = function () {
                if (this.isUsed() == false)
                    return [];
                var rows = [
                    ////////
                    // 합계
                    ////////
                    {
                        name: "라미네이팅",
                        price: this.computePrice(),
                        comment: "라미네이팅비 = 기본요금 + 추가 필름비"
                    },
                    ////////
                    // 작업비
                    ////////
                    {
                        name: "\t작업비",
                        sub_price: this.compute_base_price(),
                        comment: "동일 면적의 용지당 " + folding.library.StringUtil.numberFormat(this.baseFaces) + " 면까지"
                    },
                    {
                        name: "\t\t기본요금",
                        comment: folding.library.StringUtil.numberFormat(this.basePrice) + " 원"
                    },
                    {
                        name: "\t\t사용된 용지 크기",
                        comment: folding.library.StringUtil.numberFormat(this.compute_units().size()) + " 종류"
                    },
                    ////////
                    // 코팅비
                    ////////
                    {
                        name: "\t추가 필름비",
                        sub_price: this.compute_over_price(),
                        comment: "초과면적 / 종이면 면적당가격 (m^2)"
                    },
                    {
                        name: "\t\t초과면적",
                        comment: folding.library.StringUtil.numberFormat(this.compute_over_area() / 1000 / 1000) + " m^2"
                    }
                ].concat(this.toGridRows_area(), [
                    {
                        name: "\t\t1m^2 당 가격",
                        comment: folding.library.StringUtil.numberFormat(this.filmPrice) + " 원 / m^2"
                    }
                ]);
                return rows;
            };
            LaminatingModel.prototype.toGridRows_area = function () {
                var units = this.compute_units();
                var rows = [];
                var i = 0;
                for (var it = units.begin(); !it.equal_to(units.end()); it = it.next()) {
                    if (it.second <= this.baseFaces)
                        continue;
                    var row = {
                        name: folding.library.StringUtil.substitute("\t\t\t{1}. {2} x {3}", ++i, folding.library.StringUtil.numberFormat(it.first.getWidth()), folding.library.StringUtil.numberFormat(it.first.getHeight())),
                        comment: folding.library.StringUtil.substitute("초과 {1} 면 -> {2} m^2", folding.library.StringUtil.numberFormat(it.second - this.baseFaces), folding.library.StringUtil.numberFormat(it.first.computeArea() * (it.second - this.baseFaces) / 1000 / 1000))
                    };
                    rows.push(row);
                }
                return rows;
            };
            return LaminatingModel;
        }(folding.SideOptionalModel));
        folding.LaminatingModel = LaminatingModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 종이 모형 엔티티. </p>
         *
         * <p> {@link name 지류}와 {@link price 단위면적당 가격}을 속성으로 갖으며, 해당 종이 모형이 가질 수 있는
         * {@link PaperSize 크기}들을 자식 객체로 지니고 있다. </p>
         *
         * <p> 용지비: 매수 x 용지면적 / cm<sup>2</sup> </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var PaperModel = (function (_super) {
            __extends(PaperModel, _super);
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function PaperModel() {
                _super.call(this);
                this.init();
            }
            /**
             * @inheritdoc
             */
            PaperModel.prototype.createChild = function (xml) {
                return new folding.PaperSize();
            };
            /**
             * @inheritdoc
             */
            PaperModel.prototype.init = function () {
                this.name = "기본 용지";
                this.price = 360;
                this.clear();
                // 46 전지
                this.push(new folding.PaperSize(1070, 720), new folding.PaperSize(788, 540), new folding.PaperSize(1091, 390), new folding.PaperSize(788, 360), new folding.PaperSize(690, 390), new folding.PaperSize(540, 390), new folding.PaperSize(788, 270), new folding.PaperSize(450, 330), new folding.PaperSize(465, 315), new folding.PaperSize(788, 216), new folding.PaperSize(420, 297), new folding.PaperSize(390, 360), new folding.PaperSize(540, 260), new folding.PaperSize(510, 270), new folding.PaperSize(540, 216), new folding.PaperSize(410, 260), new folding.PaperSize(420, 240), new folding.PaperSize(390, 270));
                // 국전지
                this.push(new folding.PaperSize(939, 636), new folding.PaperSize(636, 456), new folding.PaperSize(636, 310), new folding.PaperSize(465, 315), new folding.PaperSize(636, 233), new folding.PaperSize(315, 310), new folding.PaperSize(465, 210), new folding.PaperSize(315, 233), new folding.PaperSize(310, 210));
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * 종이명 (재질명) 이 종이모형의 키값이다.
             */
            PaperModel.prototype.key = function () {
                return this.name;
            };
            /**
             * @inheritdoc
             */
            PaperModel.prototype.computePrice = function (folder) {
                // 용지 가격 = 면적당가격 X (본 면적 + 여분지 면적) (m^2)
                return this.price * (this.compute_area(folder) + this.compute_spare_area(folder)) / 1000 / 1000;
            };
            /**
             * 조판에 사용케되는 용지의 총 면적을 계산함
             *
             * @param folder 접지행위자
             * @return 용지의 총 면적
             */
            PaperModel.prototype.compute_area = function (folder) {
                var area = 0;
                if (folder.computeSide() == 1)
                    for (var i = 0; i < folder.size(); i++) {
                        var placement = folder.at(i);
                        // 단면의 경우엔, 이미지의 면적에
                        var my_area = placement.getPaperSize().computeArea();
                        my_area *= placement.face_count(); // 판면의 면 수를 곱하고
                        my_area *= placement.computeCopies(); // 사본 수량을 다시 곱해주면 된다
                        // 총 면적에 더함
                        area += my_area;
                    }
                else {
                    for (var i = 0; i < folder.size(); i++) {
                        var placement = folder.at(i);
                        var my_area = void 0;
                        if (placement.face_count() % 2 == 0) {
                            // 짝수개의 판면을 가진 경우에는
                            my_area = placement.getPaperSize().computeArea(); // 이미지 면적에
                            my_area *= placement.face_count() / 2; // 판면의 면 수를 곱하고
                            my_area *= placement.computeCopies(); // 사본 수만큼 곱해주면 됨
                        }
                        else {
                            if (placement.getLink() != null && i > 0 && placement.getLink() == folder[i - 1]) {
                                // Link 를 지닌 경우
                                // 이전 페이지 (앞면) 에서 이어지는 경우에 해당
                                continue;
                            }
                            else {
                                my_area = placement.getPaperSize().computeArea(); // 이미지 면적에
                                my_area *= Math.ceil(placement.face_count() / 2); // 판면의 면 수를 올림하여 곱하고
                                my_area *= placement.computeCopies(); // 조정된 사본 수를 곱해준다
                            }
                        }
                        area += my_area;
                    }
                }
                return area;
            };
            /**
             * 현재의 조판이 필요로 하는 여분지, 그 여분지의 총 면적을 계산함.
             *
             * @param folder 접지행위자
             * @return 필요 여분지에 대한 총 면적
             */
            PaperModel.prototype.compute_spare_area = function (folder) {
                var price_models = folder.getPriceModels();
                var spares = [
                    price_models.getPrint(),
                    price_models.getFoil(),
                    price_models.getScodix(),
                    price_models.getThomson(),
                    price_models.getLaminating()
                ];
                var area = 0.0;
                for (var i = 0; i < spares.length; i++)
                    if (spares[i].isUsed() == true)
                        area += spares[i].compute_spare_area();
                return area;
            };
            PaperModel.prototype.getName = function () {
                return this.name;
            };
            PaperModel.prototype.getPrice = function () {
                return this.price;
            };
            Object.defineProperty(PaperModel.prototype, "$name", {
                get: function () { return this.name; },
                set: function (val) { this.name = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PaperModel.prototype, "$price", {
                get: function () { return this.price + ""; },
                set: function (val) { this.price = Number(val); },
                enumerable: true,
                configurable: true
            });
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PaperModel.prototype.TAG = function () {
                return "paper";
            };
            /**
             * @inheritdoc
             */
            PaperModel.prototype.CHILD_TAG = function () {
                return "size";
            };
            /**
             * @inheritdoc
             */
            PaperModel.prototype.toGridRows = function (folder) {
                var scale = 0.0;
                for (var i = 0; i < folder.size(); i++)
                    scale += folder.at(i).getPaperSize().computeArea();
                var rows = [
                    ////////
                    // 합계
                    ////////
                    {
                        name: "용지",
                        price: this.computePrice(folder),
                        comment: "용지비 = 용지면적 X 면적대비가격 (m^2)"
                    },
                    {
                        name: "\t\t용지명",
                        comment: this.name
                    },
                    {
                        name: "\t\t용지면적",
                        comment: folding.library.StringUtil.substitute("본지: {1} m^2, 여분지: {2} m^2", folding.library.StringUtil.numberFormat(this.compute_area(folder) / 1000 / 1000, 4), folding.library.StringUtil.numberFormat(this.compute_spare_area(folder) / 1000 / 1000, 4))
                    },
                    {
                        name: "\t\t면적대비가격",
                        comment: folding.library.StringUtil.numberFormat(this.price) + " 원 / m^2"
                    }
                ];
                return rows;
            };
            return PaperModel;
        }(folding.protocol.EntityArrayCollection));
        folding.PaperModel = PaperModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 가격모형 리스트. </p>
         *
         * <p> 단가 산정에 필요한 가격모형 오브젝트들을 담아놓은 리스트. </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var PriceModels = (function (_super) {
            __extends(PriceModels, _super);
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function PriceModels(process) {
                _super.call(this);
                this.process = process;
                this.print = new folding.PrintModel(this);
                this.foil = new folding.FoilModel(this);
                this.scodix = new folding.ScodixModel(this);
                this.thomson = new folding.ThomsonModel(this);
                this.laminating = new folding.LaminatingModel(this);
                this.init();
            }
            /**
             * @inheritdoc
             */
            PriceModels.prototype.init = function () {
                this.print.init();
                this.foil.init();
                this.scodix.init();
                this.thomson.init();
                this.laminating.init();
            };
            /**
             * @inheritdoc
             */
            PriceModels.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                this.print.construct(xml.get(this.print.TAG()).front());
                this.foil.construct(xml.get(this.foil.TAG()).front());
                this.scodix.construct(xml.get(this.scodix.TAG()).front());
                this.thomson.construct(xml.get(this.thomson.TAG()).front());
                this.laminating.construct(xml.get(this.laminating.TAG()).front());
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PriceModels.prototype.computePrice = function () {
                // 용지 사용가격을 시작으로 하여
                var price = this.process.getPaper().computePrice(this.process);
                // 기타 공정에 대한 소요가격을 합산함
                var options = [this.print, this.foil, this.scodix, this.thomson, this.laminating];
                for (var i = 0; i < options.length; i++)
                    if (options[i].isUsed() == true)
                        price += options[i].computePrice();
                return price;
            };
            PriceModels.prototype.getProcess = function () {
                return this.process;
            };
            PriceModels.prototype.getPrint = function () {
                return this.print;
            };
            PriceModels.prototype.getFoil = function () {
                return this.foil;
            };
            PriceModels.prototype.getScodix = function () {
                return this.scodix;
            };
            PriceModels.prototype.getThomson = function () {
                return this.thomson;
            };
            PriceModels.prototype.getLaminating = function () {
                return this.laminating;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PriceModels.prototype.TAG = function () {
                return "pricesModels";
            };
            /**
             * @inheritdoc
             */
            PriceModels.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                {
                    xml.push(this.print.toXML());
                    xml.push(this.foil.toXML());
                    xml.push(this.scodix.toXML());
                    xml.push(this.thomson.toXML());
                    xml.push(this.laminating.toXML());
                }
                return xml;
            };
            /**
             * @inheritdoc
             */
            PriceModels.prototype.toGridRows = function () {
                var rows = [
                    { name: "총합", price: this.process.computePrice() }
                ].concat(this.process.getPaper().toGridRows(this.process), this.print.toGridRows(), this.foil.toGridRows(), this.scodix.toGridRows(), this.thomson.toGridRows(), this.laminating.toGridRows());
                return rows;
            };
            return PriceModels;
        }(folding.protocol.Entity));
        folding.PriceModels = PriceModels;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 인쇄 모형. </p>
         *
         * <ol>
         * 	<li> 작업비: 7,000 원 / 1,000 면 x 색상도수 </li>
         * 	<li> CTP 출력비: 조판수 x 색상도수 x 7,000 원 </li>
         * </ol>
         *
         * <h3> 비고 </h3>
         * <ul>
         * 	<li> 양/단면 선택 가능 </li>
         * 	<li> 여유 용지: 면당 30 매 </li>
         * </ul>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var PrintModel = (function (_super) {
            __extends(PrintModel, _super);
            function PrintModel() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            // using super::constructor
            /**
             * @inheritdoc
             */
            PrintModel.prototype.init = function () {
                // BASE MEMBERS
                this.used = true;
                this.side = 2;
                this.sparePapers = 125;
                // SPECIFIED MEMBERS
                this.workPrice = 7000;
                this.workFaces = 1000;
                this.ctpPrice = 7000;
                this.frontSideColorCode = "CMYK";
                this.backSideColorCode = "CMYK";
            };
            /* =========================================================
                ACCESSROS
                    - COMPUTES
                    - GETTERS
                    - SETTERS
            ============================================================
                COMPUTES
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PrintModel.prototype.computePrice = function () {
                if (this.isUsed() == false)
                    return 0;
                // 인쇄비 = 작업비 + CTP 출력비
                return this.compute_work_price() + this.compute_ctp_price();
            };
            /**
             * 작업비용 계산.
             */
            PrintModel.prototype.compute_work_price = function () {
                // 작업비용 = (단위당 비용 x 단위수) x 색상도수
                return (this.workPrice * this.compute_units())
                    * this.compute_weighed_average_color_degree(); // 가중평균된 색상도수
            };
            /**
             * CTP 가격 계산.
             */
            PrintModel.prototype.compute_ctp_price = function () {
                ////////
                // CTP 비용 = CTP 가격 X 판면수 X 색상도수
                ////////
                // 도장을 찍는 것과 같아, 부수와는 관계 없다
                // 오로지 판 수에만 영향을 받는다
                return this.ctpPrice * this.process.computeFaceCount() * this.compute_weighed_average_color_degree();
            };
            /**
             * 단위 수를 계산함.
             *
             * @param this.process 접지행위자
             * @return 단위 수
             */
            PrintModel.prototype.compute_units = function () {
                // 각 면마다 별개의 작업 (유닛) 으로 친다
                // 각 면마다, 사본 수량만큼 찍게 되는데, 이 때 사본의 수량이 각 면의 작업 유닛 수를 결정함
                var units = 0;
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    units += placement.face_count() * Math.ceil(placement.computeCopies() / this.workFaces);
                }
                return units;
            };
            /**
             * <p> 앞/뒷면 색상도수의 가중평균을 구함. </p>
             *
             * <p> 단면 조판의 경우에는, 앞면의 색상도수가 리턴되나, 양면 조판의 경우에는 앞/뒷면의 조판면 수를
             * 고려한, 색상도수의 가중평균이 리턴된다. 돈땡 및 판걸이가 고려된, 사용된 앞/뒷면의 총수가 각각의
             * 가중치로 들어가게 된다. </p>
             *
             * @param this.process 접지행위자
             * @return 색상도수의 가중평균
             */
            PrintModel.prototype.compute_weighed_average_color_degree = function () {
                var face_count = this.process.computeFaceCount();
                if (this.side == 1) {
                    // 단면일 때, 앞면의 색상도수가 곧 평균 도수이다
                    return this.frontSideColorCode.length;
                }
                else {
                    var color_codes = 0;
                    for (var i = 0; i < this.process.size(); i++) {
                        var placement = this.process.at(i);
                        var is_front = true;
                        // 각각 양-단면일 때의 색상도수를 가중하여 더함
                        // 단 이 때, 최후의 홀수 페이지는 제하고, 그 이전의 짝수 페이지까지에 대해서만 계산한다
                        color_codes += Math.floor(placement.face_count() / 2) * this.frontSideColorCode.length;
                        color_codes += Math.floor(placement.face_count() / 2) * this.backSideColorCode.length;
                        if (placement.face_count() % 2 == 1)
                            if (placement.inverse_count() > 1) {
                                // 돈땡이 행해진 경우에, 앞뒷면을 한 판면에 같이 찍기 때문에
                                // 색상코드의 합집합을 적용시켜야 한다.
                                color_codes += this.compute_intersect_color_degree();
                            }
                            else {
                                if (is_front == true)
                                    color_codes += this.frontSideColorCode.length;
                                else
                                    color_codes += this.backSideColorCode.length;
                                // 앞, 뒷면 역전
                                is_front = !is_front;
                            }
                    }
                    // 전체 색상도수의 합 / 판면수 = 가중평균된 색상도수
                    return color_codes / face_count;
                }
            };
            /**
             * 앞/뒷면 색상코드의 교집합, 그 교집합의 원소 수를 계산함.
             *
             * @return 색상코드 교집합의 원소 수.
             */
            PrintModel.prototype.compute_intersect_color_degree = function () {
                // 색상코드 셋
                var color_codes = new std.HashSet();
                // 앞면의 색상코드를 모두 해쉬셋에 모두 삽입
                for (var i = 0; i < this.frontSideColorCode.length; i++)
                    color_codes.insert(this.frontSideColorCode.charCodeAt(i));
                // 앞면의 색상코드도 모두 해쉬셋에 모두 삽입
                for (var i = 0; i < this.backSideColorCode.length; i++)
                    color_codes.insert(this.backSideColorCode.charCodeAt(i));
                return color_codes.size();
            };
            /* ---------------------------------------------------------
                GETTERS
            --------------------------------------------------------- */
            PrintModel.prototype.getWorkPrice = function () {
                return this.workPrice;
            };
            PrintModel.prototype.getWorkFaces = function () {
                return this.workFaces;
            };
            PrintModel.prototype.getCTPPrice = function () {
                return this.ctpPrice;
            };
            PrintModel.prototype.getFrontSideColorCode = function () {
                return this.frontSideColorCode;
            };
            PrintModel.prototype.getBackSideColorCode = function () {
                return this.backSideColorCode;
            };
            /* ---------------------------------------------------------
                SETTERS
            --------------------------------------------------------- */
            PrintModel.prototype.setWorkPrice = function (val) {
                this.workPrice = val;
            };
            PrintModel.prototype.setWorkFaces = function (val) {
                this.workFaces = val;
            };
            PrintModel.prototype.setCTPPrice = function (val) {
                this.ctpPrice = val;
            };
            PrintModel.prototype.setFrontSideColorCode = function (val) {
                this.frontSideColorCode = val;
            };
            PrintModel.prototype.setBackSideColorCode = function (val) {
                this.backSideColorCode = val;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PrintModel.prototype.TAG = function () {
                return "print";
            };
            /**
             * @inheritdoc
             */
            PrintModel.prototype.toGridRows = function () {
                if (this.isUsed() == false)
                    return [];
                var rows = [
                    ////////
                    // 합계
                    ////////
                    {
                        name: "인쇄",
                        price: this.computePrice(),
                        comment: "인쇄비 = 작업비 + CTP 출력비"
                    },
                    ////////
                    // 작업비
                    ////////
                    {
                        name: "\t작업비",
                        sub_price: this.compute_work_price(),
                        comment: "작업비 = 작업단위 X 단위당작업비 X 도수"
                    },
                    {
                        name: "\t\t작업단위",
                        comment: folding.library.StringUtil.substitute("{1} 판면 X 올림({2} 부 / {3} 판면) = {4} 단위", folding.library.StringUtil.numberFormat(this.process.computeFaceCount()), folding.library.StringUtil.numberFormat(this.process.getImage().getCopies()), folding.library.StringUtil.numberFormat(this.workFaces), folding.library.StringUtil.numberFormat(this.compute_units()))
                    },
                    {
                        name: "\t\t단위당 작업비",
                        comment: folding.library.StringUtil.numberFormat(this.workPrice) + " 원"
                    }
                ].concat(this.toGridRows_units(), [
                    {
                        name: "\t\t색상코드",
                        comment: this.side == 1
                            ? this.frontSideColorCode
                            : folding.library.StringUtil.substitute("{1} (#{2}), {3} (#{4})", this.frontSideColorCode, this.frontSideColorCode.length, this.backSideColorCode, this.backSideColorCode.length)
                    },
                    ////////
                    // CTP 출력비
                    ////////
                    {
                        name: "\tCTP 출력비",
                        sub_price: this.compute_ctp_price(),
                        comment: "CTP 출력비 = 판면수 X 도수 X 도가격"
                    },
                    {
                        name: "\t\t판면수",
                        comment: folding.library.StringUtil.numberFormat(this.process.computeFaceCount()) + " 판면"
                    },
                    {
                        name: "\t\t색상코드",
                        comment: this.side == 1
                            ? this.frontSideColorCode
                            : folding.library.StringUtil.substitute("{1} (#{2}), {3} (#{4})", this.frontSideColorCode, this.frontSideColorCode.length, this.backSideColorCode, this.backSideColorCode.length)
                    },
                    {
                        name: "\t\t도가격",
                        comment: folding.library.StringUtil.numberFormat(this.ctpPrice) + " 원 / 도"
                    }
                ]);
                return rows;
            };
            PrintModel.prototype.toGridRows_units = function () {
                var rows = [];
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    var units = placement.face_count() * Math.ceil(placement.computeCopies() / this.workFaces);
                    var row = {
                        name: folding.library.StringUtil.substitute("\t\t\t{1}. {2} x {3}", i + 1, folding.library.StringUtil.numberFormat(placement.getPaperSize().getWidth()), folding.library.StringUtil.numberFormat(placement.getPaperSize().getHeight())),
                        comment: folding.library.StringUtil.substitute("{1} 판면, {2} -> {3} 단위", folding.library.StringUtil.numberFormat(placement.face_count()), placement.$copies, 
                        //library.StringUtil.numberFormat(placement.computeCopies()),
                        folding.library.StringUtil.numberFormat(units))
                    };
                    rows.push(row);
                }
                return rows;
            };
            return PrintModel;
        }(folding.SideOptionalModel));
        folding.PrintModel = PrintModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var PriceModelEditor = (function (_super) {
            __extends(PriceModelEditor, _super);
            function PriceModelEditor() {
                _super.apply(this, arguments);
            }
            PriceModelEditor.prototype.render = function () {
                var price_model_list = this.props.priceModels;
                var print = price_model_list.getPrint();
                var foil = price_model_list.getFoil();
                var scodix = price_model_list.getScodix();
                var thomson = price_model_list.getThomson();
                var laminating = price_model_list.getLaminating();
                return React.createElement("div", null, React.createElement("h3", null, " 가격 모형 "), React.createElement("h4", null, " ", React.createElement("input", {type: "checkbox", defaultChecked: print.isUsed(), onChange: this.change_model_enabled.bind(this, print)}), " 인쇄 "), React.createElement("ul", {id: "print_price_model_editor_ui", disabled: !print.isUsed()}, React.createElement("li", null, " 작업비 (계단형 고정비):", React.createElement("input", {type: "number", defaultValue: print.getWorkPrice(), onChange: this.change_member_value_number.bind(this, print.setWorkPrice.bind(print)), style: { width: 70 }}), " 원" + ' ' + "/", React.createElement("input", {type: "number", defaultValue: print.getWorkFaces(), onChange: this.change_member_value_number.bind(this, print.setWorkFaces.bind(print)), style: { width: 70 }}), " 면 X 도 (색상, CMYK: 4도)"), React.createElement("li", null, " CTP 출력비 (변동비): 판 X 도 X", React.createElement("input", {type: "number", defaultValue: print.getCTPPrice(), onChange: this.change_member_value_number.bind(this, print.setCTPPrice.bind(print)), style: { width: 70 }}), " 원"), React.createElement("li", null, " 여분 용지", React.createElement("input", {type: "number", defaultValue: print.getSparePapers(), onChange: this.change_member_value_number.bind(this, print.setSparePapers.bind(print)), style: { width: 70 }}), " 매 / 판"), React.createElement("li", null, " 양/단면:", React.createElement("select", {onChange: this.change_print_side.bind(this)}, React.createElement("option", {value: 1, selected: print.getSide() == 1}, " 단면 "), React.createElement("option", {value: 2, selected: print.getSide() == 2}, " 양면 "))), React.createElement("li", null, " 색상 도수:", React.createElement("ul", null, React.createElement("li", null, " 앞면:", React.createElement("input", {defaultValue: print.getFrontSideColorCode(), onChange: this.change_member_value_string.bind(this, print.setFrontSideColorCode.bind(print)), style: { width: 70 }}), " 도"), React.createElement("li", {id: "print_price_model_side_editor_li", disabled: print.getSide() == 1}, " 뒷면:", React.createElement("input", {defaultValue: print.getBackSideColorCode(), onChange: this.change_member_value_string.bind(this, print.setBackSideColorCode.bind(print)), style: { width: 70 }}), " 도")))), React.createElement("h4", null, " ", React.createElement("input", {type: "checkbox", defaultChecked: foil.isUsed(), onChange: this.change_model_enabled.bind(this, foil)}), " 박 "), React.createElement("ul", {id: "foil_price_model_editor_ui", disabled: !foil.isUsed()}, React.createElement("li", null, " 단위당 작업비 (변동비):", React.createElement("input", {type: "number", defaultValue: foil.getWorkPrice(), onChange: this.change_member_value_number.bind(this, foil.setWorkPrice.bind(foil)), style: { width: 70 }}), " 원" + ' ' + "/", React.createElement("input", {type: "number", defaultValue: foil.getWorkFaces(), onChange: this.change_member_value_number.bind(this, foil.setWorkFaces.bind(foil)), style: { width: 70 }}), " 면"), React.createElement("li", null, " 동판비 / 판 (도장):", React.createElement("input", {type: "number", defaultValue: foil.getCopperPrice(), onChange: this.change_member_value_number.bind(this, foil.setCopperPrice.bind(foil)), style: { width: 70 }}), " 원 / cm^2"), React.createElement("li", null, " 박비 / 판 (잉크비):", React.createElement("input", {type: "number", defaultValue: foil.getInkPrice(), onChange: this.change_member_value_number.bind(this, foil.setInkPrice.bind(foil)), style: { width: 70 }}), " 원 / m^2"), React.createElement("li", null, " 잉크 면적 (임시)", React.createElement("input", {type: "number", defaultValue: foil.$getInkAreaPercentage(), onChange: this.change_member_value_number.bind(this, foil.$setInkAreaPercentage.bind(foil)), style: { width: 70 }}), " % / 종이면적"), React.createElement("li", null, " 여분 용지", React.createElement("input", {type: "number", defaultValue: foil.getSparePapers(), onChange: this.change_member_value_number.bind(this, foil.setSparePapers.bind(foil)), style: { width: 70 }}), " 매 / 판"), React.createElement("li", null, " 양/단면:", React.createElement("select", {onChange: this.change_member_value_number.bind(this, foil.setSide.bind(foil))}, React.createElement("option", {value: 1, selected: foil.getSide() == 1}, " 단면 "), React.createElement("option", {value: 2, selected: foil.getSide() == 2}, " 양면 ")))), React.createElement("h4", null, " ", React.createElement("input", {type: "checkbox", defaultChecked: scodix.isUsed(), onChange: this.change_model_enabled.bind(this, scodix)}), " 스코딕스 "), React.createElement("ul", {id: "scodix_price_model_editor_ui", disabled: !scodix.isUsed()}, React.createElement("li", null, " 인쇄 단위당 작업비 (A3 한 장당 고정비, 기본요금 격):", React.createElement("input", {type: "number", defaultValue: scodix.getWorkPrice(), onChange: this.change_member_value_number.bind(this, scodix.setWorkPrice.bind(scodix)), style: { width: 70 }}), " 원 / A3 1장"), React.createElement("li", null, " 한 판 잉크비:", React.createElement("input", {type: "number", defaultValue: scodix.getInkPrice(), onChange: this.change_member_value_number.bind(this, scodix.setInkPrice.bind(scodix)), style: { width: 70 }}), " 원 / A3 1% 면적"), React.createElement("li", null, " 잉크 면적 (임시)", React.createElement("input", {type: "number", defaultValue: scodix.$getInkAreaPercentage(), onChange: this.change_member_value_number.bind(this, scodix.$setInkAreaPercentage.bind(foil)), style: { width: 70 }}), " % / 종이면적"), React.createElement("li", null, " 여분 용지", React.createElement("input", {type: "number", defaultValue: scodix.getSparePapers(), onChange: this.change_member_value_number.bind(this, scodix.setSparePapers.bind(scodix)), style: { width: 70 }}), " 매 / 판"), React.createElement("li", null, " 양/단면:", React.createElement("select", {onChange: this.change_member_value_number.bind(this, scodix.setSide.bind(scodix))}, React.createElement("option", {value: 1, selected: scodix.getSide() == 1}, " 단면 "), React.createElement("option", {value: 2, selected: scodix.getSide() == 2}, " 양면 ")))), React.createElement("h4", null, " ", React.createElement("input", {type: "checkbox", defaultChecked: thomson.isUsed(), onChange: this.change_model_enabled.bind(this, thomson)}), " 톰슨 "), React.createElement("ul", {id: "thomson_price_model_editor_ui", disabled: !thomson.isUsed()}, React.createElement("li", null, " 단위당 작업비 "), React.createElement("ul", null, React.createElement("li", null, " 고정 비용 (계단형 변동비):", React.createElement("input", {type: "number", defaultValue: thomson.getWorkUnitPrice(), onChange: this.change_member_value_number.bind(this, thomson.setWorkUnitPrice.bind(thomson)), style: { width: 70 }}), " 원" + ' ' + "/", React.createElement("input", {type: "number", defaultValue: thomson.getWorkUnitFaces(), onChange: this.change_member_value_number.bind(this, thomson.setWorkUnitFaces.bind(thomson)), style: { width: 70 }}), " 매"), React.createElement("li", null, " 추가 비용 (변동비):", React.createElement("input", {type: "number", defaultValue: thomson.getWorkSurplusPrice(), onChange: this.change_member_value_number.bind(this, thomson.setWorkSurplusPrice.bind(thomson)), style: { width: 70 }}), "원 / 매"), React.createElement("li", null, " 여분 용지", React.createElement("input", {type: "number", defaultValue: thomson.getSparePapers(), onChange: this.change_member_value_number.bind(this, thomson.setSparePapers.bind(thomson)), style: { width: 70 }}), " 매 / 판")), React.createElement("li", null, " 한 판 칼비 (도장):", React.createElement("input", {type: "number", defaultValue: thomson.getCuttingPrice(), onChange: this.change_member_value_number.bind(this, thomson.setCuttingPrice.bind(thomson)), style: { width: 70 }}), " 원 / m"), React.createElement("li", null, " 칼 길이 (임시):", React.createElement("input", {type: "number", defaultValue: thomson.$getCuttingLength(), onChange: this.change_member_value_number.bind(this, thomson.$setCuttingLength.bind(thomson)), style: { width: 70 }}), " m / 페이지")), React.createElement("h4", null, " ", React.createElement("input", {type: "checkbox", defaultChecked: laminating.isUsed(), onChange: this.change_model_enabled.bind(this, laminating)}), " 라미네이팅 "), React.createElement("ul", {id: "laminating_price_model_editor_ui", disabled: !laminating.isUsed()}, React.createElement("li", null, " 작업비:", React.createElement("input", {type: "number", defaultValue: laminating.getBasePrice(), onChange: this.change_member_value_number.bind(this, laminating.setBasePrice.bind(laminating)), style: { width: 70 }}), "원" + ' ' + "/", React.createElement("input", {type: "number", defaultValue: laminating.getBaseFaces(), onChange: this.change_member_value_number.bind(this, laminating.setBaseFaces.bind(laminating)), style: { width: 70 }}), "면"), React.createElement("li", null, " 필름 가격:", React.createElement("input", {type: "number", defaultValue: laminating.getInkPrice(), onChange: this.change_member_value_number.bind(this, laminating.setInkPrice.bind(laminating)), style: { width: 70 }}), "원 / m^2"), React.createElement("li", null, " 여분 용지", React.createElement("input", {type: "number", defaultValue: laminating.getSparePapers(), onChange: this.change_member_value_number.bind(this, laminating.setSparePapers.bind(laminating)), style: { width: 70 }}), " 매 / 판"), React.createElement("li", null, " 양/단면:", React.createElement("select", {onChange: this.change_member_value_number.bind(this, laminating.setSide.bind(laminating))}, React.createElement("option", {value: 1, selected: laminating.getSide() == 1}, " 단면 "), React.createElement("option", {value: 2, selected: laminating.getSide() == 2}, " 양면 ")))));
            };
            PriceModelEditor.prototype.change_member_value_number = function (setter, event) {
                var value = Number(event.target.value);
                setter(value);
            };
            PriceModelEditor.prototype.change_member_value_string = function (setter, event) {
                var value = String(event.target.value);
                setter(value);
            };
            PriceModelEditor.prototype.change_model_enabled = function (priceModel, event) {
                priceModel["setUsed"](event.target.checked);
                var html_element = null;
                if (priceModel instanceof folding.PrintModel)
                    html_element = document.getElementById("print_price_model_editor_ui");
                else if (priceModel instanceof folding.FoilModel)
                    html_element = document.getElementById("foil_price_model_editor_ui");
                else if (priceModel instanceof folding.ScodixModel)
                    html_element = document.getElementById("scodix_price_model_editor_ui");
                else if (priceModel instanceof folding.ThomsonModel)
                    html_element = document.getElementById("thomson_price_model_editor_ui");
                else if (priceModel instanceof folding.LaminatingModel)
                    html_element = document.getElementById("laminating_price_model_editor_ui");
                if (html_element != null)
                    html_element["disabled"] = !event.target.checked;
            };
            PriceModelEditor.prototype.change_print_side = function (event) {
                var val = Number(event.target.value);
                this.props.priceModels.getPrint().setSide(val);
                document.getElementById("print_price_model_side_editor_li")["disabled"] = (val == 1);
            };
            return PriceModelEditor;
        }(React.Component));
        folding.PriceModelEditor = PriceModelEditor;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var ProcessArrayEditor = (function (_super) {
            __extends(ProcessArrayEditor, _super);
            function ProcessArrayEditor() {
                _super.apply(this, arguments);
                this.selected_index = 0;
            }
            Object.defineProperty(ProcessArrayEditor.prototype, "selected_process", {
                get: function () {
                    try {
                        return this.props.processArray.at(this.selected_index);
                    }
                    catch (exception) {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /* ---------------------------------------------------------
                RENDERER
            --------------------------------------------------------- */
            ProcessArrayEditor.prototype.render = function () {
                // ADD_EVENT_LISTENER
                this.props.processArray.addEventListener("insert", this.handle_collection_event, this);
                this.props.processArray.addEventListener("erase", this.handle_collection_event, this);
                this.props.processArray.addEventListener("refresh", this.handle_collection_event, this);
                // CONSTRUCT COLUMNS
                var columns = [
                    { key: "$name", name: "공정명", width: 400, editable: true }
                ];
                return React.createElement("div", null, React.createElement("h1", null, " 공정 리스트 "), React.createElement(ReactDataGrid, {rowGetter: this.get_row.bind(this), rowsCount: this.props.processArray.size(), columns: columns, onCellSelected: this.handle_select.bind(this), onRowUpdated: this.handle_updated.bind(this), enableCellSelect: true, minHeight: 40 + 35 * this.props.processArray.size()}), React.createElement("p", {style: { textAlign: "right" }}, React.createElement("button", {onClick: this.insert_process.bind(this)}, " 추가 "), React.createElement("button", {onClick: this.erase_process.bind(this)}, " 삭제 ")), React.createElement("hr", null), React.createElement("h1", null, " 공정 편집기: ", this.selected_process == null ? "" : this.selected_process.$name, " "), React.createElement("div", {id: "process_editor_div"}, React.createElement(folding.ProcessEditor, {process: this.selected_process})));
            };
            ProcessArrayEditor.prototype.refresh = function () {
                this.setState({});
            };
            ProcessArrayEditor.prototype.refresh_process = function () {
                this.refresh();
                var div = document.getElementById("process_editor_div");
                if (div.children.length != 0)
                    div.removeChild(div.children[0]);
                ReactDOM.render(React.createElement(folding.ProcessEditor, {process: this.selected_process}), div);
            };
            /* =========================================================
                EVENT HANDLERS
                    - GRID
                    - ELEMENTS I/O
            ============================================================
                GRID EVENTS
            --------------------------------------------------------- */
            ProcessArrayEditor.prototype.get_row = function (index) {
                return this.props.processArray.at(index);
            };
            ProcessArrayEditor.prototype.handle_select = function (event) {
                try {
                    this.selected_index = event.rowIdx;
                    this.refresh_process();
                }
                catch (exception) { }
            };
            ProcessArrayEditor.prototype.handle_updated = function (event) {
                Object["assign"](this.selected_process, event.updated);
                this.props.processArray.refresh(this.props.processArray.begin().advance(this.selected_index));
            };
            /* ---------------------------------------------------------
                ELEMENTS I/O
            --------------------------------------------------------- */
            ProcessArrayEditor.prototype.handle_collection_event = function (event) {
                this.refresh();
            };
            ProcessArrayEditor.prototype.insert_process = function (event) {
                this.props.processArray.push_back(new folding.Process(this.props.processArray));
            };
            ProcessArrayEditor.prototype.erase_process = function (event) {
                try {
                    this.props.processArray.erase(this.props.processArray.begin().advance(this.selected_index));
                    if (this.selected_index >= this.props.processArray.size())
                        this.selected_index = -1;
                    this.refresh_process();
                }
                catch (exception) { }
            };
            return ProcessArrayEditor;
        }(React.Component));
        folding.ProcessArrayEditor = ProcessArrayEditor;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var ProcessArrayViewer = (function (_super) {
            __extends(ProcessArrayViewer, _super);
            function ProcessArrayViewer() {
                _super.apply(this, arguments);
                this.selected_index = 0;
            }
            Object.defineProperty(ProcessArrayViewer.prototype, "selected_process", {
                get: function () {
                    try {
                        return this.props.processArray.at(this.selected_index);
                    }
                    catch (exception) {
                        return null;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ProcessArrayViewer.prototype.render = function () {
                var columns = [
                    { key: "$name", name: "공정명", width: 150 },
                    { key: "$page", name: "페이지", width: 70 },
                    { key: "$copies", name: "사본", width: 70 },
                    { key: "$price", name: "가격", width: 150 }
                ];
                return React.createElement("div", null, React.createElement("h1", null, " 공정 리스트 "), React.createElement(ReactDataGrid, {rowGetter: this.get_row.bind(this), rowsCount: this.props.processArray.size(), columns: columns, onCellSelected: this.handle_select.bind(this), enableCellSelect: true, minHeight: 40 + 35 * this.props.processArray.size()}), React.createElement("p", {style: { textAlign: "right" }}, "총액: ", folding.library.StringUtil.numberFormat(this.props.processArray.computePrice()), " 원"), React.createElement("hr", null), React.createElement("h1", null, " 공정 상세견적: ", this.selected_process == null ? "" : this.selected_process.$name, " "), React.createElement("div", {id: "process_viewer_div"}, React.createElement(folding.ProcessViewer, {process: this.selected_process})));
            };
            /* ---------------------------------------------------------
                EVENT HANDLERS
            --------------------------------------------------------- */
            ProcessArrayViewer.prototype.get_row = function (index) {
                return this.props.processArray.at(index);
            };
            ProcessArrayViewer.prototype.handle_select = function (event) {
                try {
                    this.selected_index = event.rowIdx;
                    this.setState({});
                }
                catch (exception) { }
            };
            return ProcessArrayViewer;
        }(React.Component));
        folding.ProcessArrayViewer = ProcessArrayViewer;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 결과화면 뷰어. </p>
         *
         * <p> 접지 최적화 연산 결과를 화면에 도표와 그리드로 보여주는 Movie 이다. </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var ProcessViewer = (function (_super) {
            __extends(ProcessViewer, _super);
            function ProcessViewer() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                RENDERERS
            --------------------------------------------------------- */
            ProcessViewer.prototype.render = function () {
                if (this.props.process == null)
                    return React.createElement("p", null, " 아무 공정도 선택되지 않았습니다. ");
                var columns = [
                    { key: "$width", name: "가로", width: 70 },
                    { key: "$height", name: "세로", width: 70 },
                    { key: "$image_count", name: "이미지", width: 90 },
                    { key: "$paper_count", name: "용지", width: 70 },
                    { key: "$copies", name: "사본", width: 110 },
                    { key: "$rotated", name: "회전여부", width: 70 }
                ];
                if (this.props.process.empty() == false)
                    this.handle_select({ rowIdx: 0 });
                return React.createElement("div", null, React.createElement("h2", null, " 배치 정보 "), React.createElement(ReactDataGrid, {rowGetter: this.get_row.bind(this), rowsCount: this.props.process.size(), columns: columns, onCellSelected: this.handle_select.bind(this), enableCellSelect: true, minHeight: 40 + 35 * this.props.process.size()}), React.createElement("hr", null), React.createElement("h2", null, " 가격 정보 "), this.render_price_info());
            };
            ProcessViewer.prototype.render_price_info = function () {
                var process = this.props.process;
                var rows = process.getPriceModels().toGridRows();
                var tr_elements = [];
                for (var i = 0; i < rows.length; i++) {
                    // CSS 클래스명 산출
                    var class_name = void 0;
                    if (rows[i].price != undefined)
                        if (i == 0)
                            class_name = "sum_row";
                        else
                            class_name = "price_row";
                    else if (rows[i].sub_price != undefined)
                        class_name = "sub_price_row";
                    else
                        class_name = "comment_row";
                    // 행 구성
                    var tr = React.createElement("tr", {className: class_name}, React.createElement("td", {className: "border"}, folding.library.StringUtil.replaceAll(rows[i].name, "\t", "\u00a0\u00a0\u00a0\u00a0")), React.createElement("td", {className: "border"}, " ", rows[i].comment, " "), React.createElement("td", {className: "border", style: { textAlign: "right" }}, rows[i].sub_price !== undefined
                        ? folding.library.StringUtil.numberFormat(rows[i].sub_price) + " 원"
                        : ""), React.createElement("td", {className: "border", style: { textAlign: "right" }}, rows[i].price !== undefined
                        ? folding.library.StringUtil.numberFormat(rows[i].price, 0) + " 원"
                        : ""));
                    tr_elements.push(tr);
                }
                var ret = React.createElement("table", {width: "530", style: { fontSize: 11, borderCollapse: "collapse" }}, React.createElement("tr", {className: "title_row"}, React.createElement("th", null, " 항목 "), React.createElement("th", null, " 주석 "), React.createElement("th", {colSpan: 2}, " 가격 ")), tr_elements);
                return ret;
            };
            /* ---------------------------------------------------------
                EVENT HANDLERS
            --------------------------------------------------------- */
            ProcessViewer.prototype.get_row = function (index) {
                return this.props.process.at(index);
            };
            ProcessViewer.prototype.handle_select = function (event) {
                try {
                    var placement = this.props.process.at(event.rowIdx);
                    ReactDOM.render(React.createElement(folding.PlacementMovie, {placement: placement}), document.getElementById("placement_div"));
                }
                catch (exception) { }
            };
            ProcessViewer.prototype.handle_collection_event = function (event) {
                setTimeout(this.setState.bind(this, {}), 0);
            };
            return ProcessViewer;
        }(React.Component));
        folding.ProcessViewer = ProcessViewer;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 스코딕스 모형. </p>
         *
         * <ol>
         *	<li> 작업비: 25,000 원 / 1,000 면 </li>
         *	<li> 동판비 (도장): 200 원 / cm<sup>2</sup> </li>
         *	<li> 박비 (잉크): 1,300 원 / m<sup>2</sup> </li>
         * </ol>
         *
         * <h3> 비고 </h3>
         * <ul>
         *	<li> 양/단면 선택 가능 </li>
         *	<li> 여유 용지: 각 판면당 30 매 </li>
         *	<li>
         *		<b>비확정 - 할증률</b> <br/><br/>
         *
         *		스코딕스 공정이 적용되는 면수에 따라 스코딕스 가격에 할증률이 적용된다. 할증률은 출력면수에
         *		반비례하여 스코딕스 공정이 적용되는 면수가 적으면 적을수록 할증률은 높으며, 면수가 많을수록 할증률은
         *		작아진다. 이 할증률을 실제로 적용할 지 어떨 지는 아직 확정되지 않았다. <br/><br/>
         *
         *		추후 할증률을 사용하기로 결정되거든, <i>extra_charge_map</i> 에 달린 주석을 지우고, 스코딕스
         *		수량을 키값으로, {@link std.TreeMap.upper_bound extra_charge_map.upper_bound()} 함수를
         *		호출하여 할증률 값을 받은 후, 이를 최종 가격에 곱해주면 된다.
         *	</li>
         * </ul>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var ScodixModel = (function (_super) {
            __extends(ScodixModel, _super);
            function ScodixModel() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            // using super::constructor
            /**
             * @inheritdoc
             */
            ScodixModel.prototype.init = function () {
                this.used = false;
                this.workPrice = 230;
                this.inkPrice = 15;
                this.__inkAreaPercentage = 7;
                this.side = 2;
                this.sparePapers = 30;
                //this.extra_charge_map.clear();
                //this.extra_charge_map.push
                //(
                //	[1, 20],
                //	[2, 13.42],
                //	[3, 11.23],
                //	[4, 10.13],
                //	[5, 9.47],
                //	[6, 9.03],
                //	[7, 8.72],
                //	[8, 8.48],
                //	[9, 8.3],
                //	[10, 8.15],
                //	[15, 5.89],
                //	[20, 4.76],
                //	[25, 4.08],
                //	[30, 3.63],
                //	[35, 3.31],
                //	[40, 3.07],
                //	[45, 2.88],
                //	[50, 2.73],
                //	[55, 2.6],
                //	[60, 2.5],
                //	[65, 2.42],
                //	[70, 2.34],
                //	[75, 2.28],
                //	[80, 2.22],
                //	[85, 2.17],
                //	[90, 2.13],
                //	[100, 1.98],
                //	[110, 1.86],
                //	[120, 1.77],
                //	[130, 1.68],
                //	[140, 1.61],
                //	[150, 1.55],
                //	[160, 1.5],
                //	[170, 1.45],
                //	[180, 1.41],
                //	[190, 1.37],
                //	[200, 1.33],
                //	[220, 1.25],
                //	[240, 1.17],
                //	[260, 1.11],
                //	[280, 1.05],
                //	[300, 1]
                //);
            };
            //public construct(xml: library.XML): void
            //{
            //	super.construct(xml);
            //	this.extra_charge_map.clear();
            //	if (xml.has("extraCharge") == false)
            //		return;
            //	let xmlList: library.XMLList = xml.get("extraCharge");
            //	for (let i: number = 0; i < xmlList.size(); i++)
            //	{
            //		this.extra_charge_map.insert
            //			([
            //				Number(xmlList.at(i).getProperty("count")),
            //				Number(xmlList.at(i).getProperty("charge"))
            //			]);
            //	}
            //}
            /* =========================================================
                ACCESSROS
                    - COMPUTES
                    - GETTERS
                    - SETTERS
            ============================================================
                COMPUTES
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ScodixModel.prototype.computePrice = function () {
                if (this.isUsed() == false)
                    return 0;
                return this.compute_work_price() + this.compute_ink_price();
            };
            ScodixModel.prototype.compute_work_price = function () {
                // A3 기준, 한 장 당 230원
                var A3_SCALE = 297 * 420;
                //let area: number = 0;
                //for (let i: number = 0; i < this.process.size(); i++)
                //{
                //	let placement: Placement = this.process.at(i);
                //	let my_area: number = placement.getPaper().computeArea(); // 기본 종이 크기에
                //	my_area *= placement.face_count(); // 판면수를 곱하고
                //	my_area *= placement.computeCopies(); // (조정된) 부수를 곱함
                //	area += my_area; 
                //}
                // 230원 / A3 면적
                return this.workPrice * (this.compute_work_area() / A3_SCALE);
            };
            ScodixModel.prototype.compute_work_area = function () {
                var area = 0;
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    var my_area = placement.getPaperSize().computeArea(); // 기본 종이 크기에
                    my_area *= placement.face_count(); // 판면수를 곱하고
                    my_area *= placement.computeCopies(); // (조정된) 부수를 곱함
                    area += my_area;
                }
                return area;
            };
            ScodixModel.prototype.compute_ink_price = function () {
                var DENOMINATOR_SCALE = 297 * 420 / 100.0; // A3 1% 면적
                var image = this.process.getImage();
                var ink_area = image.computeArea() * (this.__inkAreaPercentage / 100.0);
                // 이미지당 잉크비 = 15원 / (A3 1% 면적)
                var image_ink_price = this.inkPrice * ink_area / DENOMINATOR_SCALE;
                // 잉크비 = 사본 수량 * 페이지 수 * 이미지당 잉크비
                return image.getCopies() * image.getPages() * image_ink_price;
            };
            /* ---------------------------------------------------------
                GETTERS
            --------------------------------------------------------- */
            ScodixModel.prototype.getWorkPrice = function () {
                return this.workPrice;
            };
            ScodixModel.prototype.getInkPrice = function () {
                return this.inkPrice;
            };
            ScodixModel.prototype.$getInkAreaPercentage = function () {
                return this.__inkAreaPercentage;
            };
            /* ---------------------------------------------------------
                SETTERS
            --------------------------------------------------------- */
            ScodixModel.prototype.setWorkPrice = function (val) {
                this.workPrice = val;
            };
            ScodixModel.prototype.setInkPrice = function (val) {
                this.inkPrice = val;
            };
            ScodixModel.prototype.$setInkAreaPercentage = function (val) {
                this.__inkAreaPercentage = val;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ScodixModel.prototype.TAG = function () {
                return "scodix";
            };
            /**
             * @inheritdoc
             */
            ScodixModel.prototype.toGridRows = function () {
                if (this.isUsed() == false)
                    return [];
                var image = this.process.getImage();
                var rows = [
                    ////////
                    // 합계
                    ////////
                    {
                        name: "스코딕스",
                        price: this.computePrice(),
                        comment: "스코딕스비 = 작업비 + 잉크비"
                    },
                    ////////
                    // 작업비
                    ////////
                    {
                        name: "\t작업비",
                        sub_price: this.compute_work_price(),
                        comment: "작업비 = 인쇄 면적 X 면적당 작업비"
                    },
                    {
                        name: "\t\t총면적",
                        comment: folding.library.StringUtil.substitute("{1} cm^2 -> A3 약 {2} 장 분량", folding.library.StringUtil.numberFormat(this.compute_work_area() / 100), folding.library.StringUtil.numberFormat(this.compute_work_price() / this.workPrice, 0))
                    },
                    {
                        name: "\t\t면적당 작업비",
                        comment: folding.library.StringUtil.numberFormat(this.workPrice)
                            + " 원 / 1,247.4cm^2 (A3 면적)"
                    },
                    ////////
                    // 잉크비
                    ////////
                    {
                        name: "\t잉크비",
                        sub_price: this.compute_ink_price(),
                        comment: "잉크비 = 총 면적 X 단위면적당 가격"
                    },
                    {
                        name: "\t\t잉크 면적",
                        comment: folding.library.StringUtil.substitute("{1} cm^2 X {2} 부 = {3} cm^2", folding.library.StringUtil.numberFormat(image.computeArea() / 100.0 * this.__inkAreaPercentage / 100.0 * image.getPages()), folding.library.StringUtil.numberFormat(image.getCopies()), folding.library.StringUtil.numberFormat(image.computeArea() / 100.0 * this.__inkAreaPercentage / 100.0 * image.getPages() * image.getCopies()))
                    },
                    {
                        name: "\t\t단위면적가",
                        comment: folding.library.StringUtil.numberFormat(this.inkPrice)
                            + " 원 / 12.474 cm^2 (A3 1% 면적)"
                    }
                ];
                return rows;
            };
            return ScodixModel;
        }(folding.SideOptionalModel));
        folding.ScodixModel = ScodixModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * 접지 어플리케이션 클래스.
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var Application = (function (_super) {
            __extends(Application, _super);
            /**
             * Default Constructor.
             */
            function Application() {
                _super.call(this);
                this.process_array = new folding.ProcessArray();
                this.process_array.push_back(new folding.Process(this.process_array));
            }
            /* =========================================================
                PROCEDURES
                    - FOLDING
                    - FILE I/O
            ============================================================
                FOLDING
            --------------------------------------------------------- */
            /**
             * 접지 버튼 클릭.
             *
             * @param event 마우스 이벤트 객체
             */
            Application.prototype.optimize = function (event) {
                // 접지 실시
                this.process_array.optimize();
                // 접지완료 후 결과화면 탭으로 이동
                this.refs["tabNavigator"].setState({ selectedIndex: 1 });
            };
            /* ---------------------------------------------------------
                FILE I/O
            --------------------------------------------------------- */
            /**
             * 새 파일 버튼 클릭.
             */
            Application.prototype.clear = function (event) {
                // 전체 초기화
                this.process_array.init();
                // 및 새로고침
                this.refresh();
            };
            /**
             * 파일 불러오기 버튼 클릭.
             */
            Application.prototype.open = function (event) {
                var this_ = this;
                var handle_select = function (event) {
                    file_ref.load();
                };
                var handle_complete = function (event) {
                    try {
                        var xml = new folding.library.XML(file_ref.data);
                        this_.process_array.construct(xml);
                        this_.refresh();
                    }
                    catch (exception) { }
                };
                var file_ref = new folding.library.FileReference();
                file_ref.addEventListener("select", handle_select);
                file_ref.addEventListener("complete", handle_complete);
                file_ref.browse();
            };
            /**
             * 파일 저장하기 버튼 클릭.
             */
            Application.prototype.save = function (event) {
                var str = "<?xml version='1.0' ?>\n" + this.process_array.toXML().toString();
                var file_ref = new folding.library.FileReference();
                file_ref.save(str, "folding.xml");
            };
            /* ---------------------------------------------------------
                RENDERERS
            --------------------------------------------------------- */
            Application.prototype.refresh = function () {
                this.setState({});
            };
            Application.prototype.render = function () {
                return React.createElement("div", {width: "100%", height: "100%"}, React.createElement("table", {style: { textAlign: "center" }}, React.createElement("tr", null, React.createElement("td", null, " ", React.createElement("img", {src: "images/newFile.png", onClick: this.clear.bind(this)}), " "), React.createElement("td", null, " ", React.createElement("img", {src: "images/openFile.png", onClick: this.open.bind(this)}), " "), React.createElement("td", null, " ", React.createElement("img", {src: "images/saveFile.png", onClick: this.save.bind(this)}), " "), React.createElement("td", null, " ", React.createElement("img", {src: "images/retrieve.png", onClick: this.optimize.bind(this)}), " ")), React.createElement("tr", null, React.createElement("td", null, " New File "), React.createElement("td", null, " Open File "), React.createElement("td", null, " Save File "), React.createElement("td", null, " Calculate "))), React.createElement(flex.TabNavigator, {ref: "tabNavigator", style: { width: 550, height: "100%", float: "left" }}, React.createElement(flex.NavigatorContent, {label: "Item Editor"}, React.createElement(folding.ProcessArrayEditor, {processArray: this.process_array})), React.createElement(flex.NavigatorContent, {label: "Result Viewer"}, React.createElement(folding.ProcessArrayViewer, {processArray: this.process_array}))), React.createElement("div", {id: "placement_div", style: { height: "100%", overflow: "hidden" }}));
            };
            /**
             * Start Application.
             */
            Application.main = function () {
                ReactDOM.render(React.createElement(Application, null), document.body);
            };
            return Application;
        }(React.Component));
        folding.Application = Application;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 이미지 엔티티. </p>
         *
         * <p> 인쇄코자 하는 이미지의 크기 및 장수와 사본 수를 지니는 엔티티이다. </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image(image) {
                if (image === void 0) { image = null; }
                _super.call(this);
                if (image == null)
                    this.init();
                else {
                    this.width = image.width;
                    this.height = image.height;
                    this.margin = image.margin;
                    this.pages = image.pages;
                    this.copies = image.copies;
                }
            }
            /**
             * 데이터 초기화. 기본값으로 되돌림.
             */
            Image.prototype.init = function () {
                this.width = 210;
                this.height = 297;
                this.margin = 5;
                this.pages = 15;
                this.copies = 1000;
                // 임시 테스트용
                //this.pages = 155;
                //this.copies = 8000;
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * 이미지 면적을 계산함.
             */
            Image.prototype.computeArea = function () {
                return this.width * this.height;
            };
            Image.prototype.getWidth = function () { return this.width; };
            Image.prototype.getHeight = function () { return this.height; };
            Image.prototype.getMargin = function () { return this.margin; };
            Image.prototype.getPages = function () { return this.pages; };
            Image.prototype.getCopies = function () { return this.copies; };
            Image.prototype.setWidth = function (val) { this.width = val; };
            Image.prototype.setHeight = function (val) { this.height = val; };
            Image.prototype.setMargin = function (val) { this.margin = val; };
            Image.prototype.setPages = function (val) { this.pages = val; };
            Image.prototype.setCopies = function (val) { this.copies = val; };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Image.prototype.TAG = function () {
                return "image";
            };
            return Image;
        }(folding.protocol.Entity));
        folding.Image = Image;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * 종이 크기 엔티티.
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var PaperSize = (function (_super) {
            __extends(PaperSize, _super);
            function PaperSize(width, height) {
                if (width === void 0) { width = 297; }
                if (height === void 0) { height = 210; }
                _super.call(this);
                // SWAP, 가로를 큰 쪽으로 둔다
                if (width < height)
                    _a = [height, width], width = _a[0], height = _a[1];
                // INITIALIZE
                this.width = width;
                this.height = height;
                var _a;
            }
            /**
             * @inheritdoc
             */
            PaperSize.prototype.construct = function (xml) {
                _super.prototype.construct.call(this, xml);
                // 마찬가지로, 가로를 큰 쪽으로 둔다
                if (this.width < this.height)
                    _a = [this.height, this.width], this.width = _a[0], this.height = _a[1];
                var _a;
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            PaperSize.prototype.key = function () {
                return std.make_pair(this.width, this.height);
            };
            /**
             * Get 가로 길이.
             */
            PaperSize.prototype.getWidth = function () { return this.width; };
            /**
             * Get 세로 길이.
             */
            PaperSize.prototype.getHeight = function () { return this.height; };
            /**
             * 종이 크기 (면적) 을 계산.
             */
            PaperSize.prototype.computeArea = function () { return this.width * this.height; };
            Object.defineProperty(PaperSize.prototype, "$width", {
                get: function () { return this.width + ""; },
                set: function (val) { this.width = Number(val); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PaperSize.prototype, "$height", {
                get: function () { return this.height + ""; },
                set: function (val) { this.height = Number(val); },
                enumerable: true,
                configurable: true
            });
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            PaperSize.prototype.TAG = function () {
                return "size";
            };
            return PaperSize;
        }(folding.protocol.Entity));
        folding.PaperSize = PaperSize;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var PlacementMovie = (function (_super) {
            __extends(PlacementMovie, _super);
            /**
             * Default Constructor.
             */
            function PlacementMovie() {
                _super.call(this);
            }
            PlacementMovie.prototype.render = function () {
                var placement = this.props.placement;
                var device = placement.getDevice();
                var paper = placement.getPaperSize();
                var paper_rect;
                var helpers = [];
                var image_rects = [];
                ///////
                // PAPER
                ///////
                paper_rect = React.createElement("rect", {width: paper.getWidth(), height: paper.getHeight(), style: { stroke: "red", strokeWidth: 1, fill: "none" }});
                ///////
                // HELPERS - BITED AREA AND AXISES
                ///////
                // BITED AREA
                if (device.computeBitedWidth() != 0)
                    helpers.push(React.createElement("rect", {width: device.computeBitedWidth(), height: paper.getHeight(), style: { fill: "black", opacity: .5 }}));
                else
                    helpers.push(React.createElement("rect", {width: paper.getWidth(), height: device.computeBitedHeight(), style: { fill: "black", opacity: .5 }}));
                // PRINTABLE AREA
                {
                    helpers.push(React.createElement("rect", {width: placement.computePrintableWidth(), height: placement.computePrintableHeight(), x: device.computeBitedWidth() + device.getNonPrintableWidth(), y: device.computeBitedHeight() + device.getNonPrintableHeight(), style: { fill: "none", stroke: "orange", strokeWidth: 1 }}));
                }
                // HORIZONTAL LINES - X AXIS
                for (var row = 1; row < placement.row_size(); row++) {
                    var y = new folding.Wrap(placement, row, 0).computeSector().y;
                    helpers.push(React.createElement("line", {x1: device.computeBitedWidth() + device.getNonPrintableWidth(), y1: y, x2: paper.getWidth() - device.getNonPrintableWidth(), y2: y, style: { stroke: "green", strokeWidth: 1 }}));
                }
                // VERTICAL LINES - Y AXIS
                for (var col = 1; col < placement.col_size(); col++) {
                    var x = new folding.Wrap(placement, 0, col).computeSector().x;
                    helpers.push(React.createElement("line", {x1: x, y1: device.computeBitedHeight() + device.getNonPrintableHeight(), x2: x, y2: paper.getHeight() - device.getNonPrintableHeight(), style: { stroke: "green", strokeWidth: 1 }}));
                }
                //////
                // DRAW IMAGE RECTANGLES
                //////
                for (var i = 0; i < placement.size(); i++) {
                    var wrap = placement.at(i);
                    var image_point = wrap.computePoint();
                    var margin = wrap.computeMargin();
                    image_rects.push(React.createElement("rect", {width: placement.computeImageWidth(), height: placement.computeImageHeight(), x: image_point.x, y: image_point.y, style: { fill: "blue", opacity: .3 }}));
                    helpers.push(React.createElement("rect", {width: margin.width, height: margin.height, x: margin.x, y: margin.y, style: { fill: "none", stroke: "skyblue" }}));
                }
                //////
                // 돈땡 및 판걸이
                //////
                var divides = [];
                if (placement.inverse_count() > 1)
                    divides.push(React.createElement("li", null, " 돈땡 (2 분할) "));
                if (placement.plaste_count() > 1)
                    divides.push(React.createElement("li", null, " 판걸이 ", placement.plaste_count(), " 회 "));
                return React.createElement("div", null, React.createElement("h4", null, " 범례 "), React.createElement("ul", null, React.createElement("li", {style: { color: "black" }}, " 검은색: 구아이 영역 "), React.createElement("li", {style: { color: "red" }}, " 빨간색: 용지 "), React.createElement("li", {style: { color: "orange" }}, " 주황색: 인쇄 가능영역 "), React.createElement("li", {style: { color: "green" }}, " 초록색: 접히는 영역 "), React.createElement("li", {style: { color: "skyblue" }}, " 하늘색: 이미지 + 여백 (margin) "), React.createElement("li", {style: { color: "blue" }}, " 파란색: 이미지 ")), divides.length != 0 ? React.createElement("h4", null, " 분할 횟수 ") : null, divides, React.createElement("p", null, " "), React.createElement("svg", {width: paper.getWidth() + 10, height: paper.getHeight() + 10}, paper_rect, helpers, image_rects));
            };
            return PlacementMovie;
        }(React.Component));
        folding.PlacementMovie = PlacementMovie;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * 조판면 모형.
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var Placement = (function (_super) {
            __extends(Placement, _super);
            function Placement() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                _super.call(this);
                if (args[0] instanceof Placement) {
                    //--------
                    // COPY CONSTRUCTOR
                    //--------
                    var obj = args[0];
                    // BAISC MEMBERS
                    this.process = obj.process;
                    this.paper_size = obj.paper_size;
                    // PROPERTIES
                    this.row_count = obj.row_count;
                    this.col_count = obj.col_count;
                    this.is_rotated = obj.is_rotated;
                    this.image_count_ = obj.image_count_;
                    this.face_count_ = obj.face_count_;
                    this.assign(obj.begin(), obj.end());
                    // DIVIDES
                    this.inverse_count_ = obj.inverse_count_;
                    this.plaste_count_ = obj.plaste_count_;
                }
                else {
                    this.process = args[0];
                    if (args.length == 2) {
                        this.paper_size = args[1];
                        // PROPERTIES
                        this.construct_count();
                        this.image_count_ = this.max_image_count();
                        this.face_count_ = 1;
                        // DIVIDES
                        this.inverse_count_ = 1;
                        this.plaste_count_ = 1;
                    }
                }
                this.link = null;
            }
            Object.defineProperty(Placement.prototype, "device", {
                /**
                 * 오프셋 장치
                 */
                get: function () { return this.process.getDevice(); },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Placement.prototype, "image", {
                /**
                 * 배치할 이미지
                 */
                get: function () { return this.process.getImage(); },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritdoc
             */
            Placement.prototype.construct = function (xml) {
                if (xml.hasProperty("paperSize") != false) {
                    var size_elements = xml.getProperty("paperSize").split("x");
                    var size_pair = std.make_pair(Number(size_elements[0]), Number(size_elements[1]));
                    if (this.process.getPaper().has(size_pair) == true)
                        this.paper_size = this.process.getPaper().get(size_pair);
                    else
                        this.paper_size = null;
                }
                else
                    this.paper_size = null;
                _super.prototype.construct.call(this, xml);
            };
            /**
             * @inheritdoc
             */
            Placement.prototype.createChild = function (xml) {
                return new folding.Wrap(this);
            };
            Placement.prototype.set_plaste = function (placement) {
                // 몇 배수로 확장하는가
                this.plaste_count_ = placement.max_image_count() / this.max_image_count();
                // 사용할 조판 용지를 (더 큰 것으로) 바꾸고
                this.paper_size = placement.paper_size;
                this.construct_count(); // 행렬과 배치가능 이미지 수를 새로이 구성한다.
                this.allocate(
                // 확장된 배수만큼 배치 이미지 수도 증가
                this.image_count_ * this.plaste_count_, this.face_count_ // 면수는 그대로
                );
            };
            /**
             * 조판을 위한 변수들을 할당함.
             *
             * @param imageCount 이미지 페이지 수
             * @param faceCount 현 배치를 반복할 횟수
             */
            Placement.prototype.allocate = function (imageCount, faceCount) {
                // 기존의 조판 배치 정보를 지우고
                this.clear();
                // 멤버 변수들을 바꿔준다.
                this.image_count_ = imageCount;
                this.face_count_ = faceCount;
                var i = 0;
                //--------
                // 회전 배치여부에 따라
                // 적절한 행렬을 산정해 기입해준다.
                //--------
                if (this.is_rotated == false)
                    for (var row = 0; row < this.row_count; row++)
                        for (var col = 0; col < this.col_count; col++)
                            if (++i > this.image_count_)
                                break;
                            else
                                this.push_back(new folding.Wrap(this, row, col));
                else
                    for (var col = 0; col < this.col_count; col++)
                        for (var row = 0; row < this.row_count; row++)
                            if (++i > this.image_count_)
                                break;
                            else
                                this.push_back(new folding.Wrap(this, row, col));
            };
            Placement.prototype.construct_count = function () {
                //if (this.containable() == false)
                //{
                //	this.row_count = 0;
                //	this.col_count = 0;
                //	this.is_rotated = false;
                //	return;
                //}
                /////
                // NON-ROTATED COUNTS
                /////
                var cols = this.floor(this.computePrintableWidth()
                    /
                        (this.image.getWidth() + this.image.getMargin()));
                var rows = this.floor(this.computePrintableHeight()
                    /
                        (this.image.getHeight() + 2 * this.image.getMargin()));
                /////
                // ROTATED COUNTS
                /////
                var rotated_cols = this.floor(this.computePrintableWidth()
                    /
                        (this.image.getHeight() + 2 * this.image.getMargin()));
                var rotated_rows = this.floor(this.computePrintableHeight()
                    /
                        (this.image.getWidth() + this.image.getMargin()));
                // ONLY A COL IN A PAGE, HOWEVER ONE DIRECTION CAN BE INVALID
                if (cols == 1 && rotated_cols == 1 && rows >= 1 && rotated_rows >= 1) {
                    // ROTATED IS INVALID OR (NON-ROTATED IS VALID AND COUNT OF ROW IS ALSO GREATER)
                    if (this.computePrintableWidth() < this.image.getHeight() + 2 * this.image.getMargin()
                        || ((this.computePrintableWidth() >= this.image.getWidth() + 2 * this.image.getMargin())
                            && rows >= rotated_cols)) {
                        this.is_rotated = false;
                    }
                }
                else
                    this.is_rotated = (rows * cols < rotated_rows * rotated_cols);
                if (this.is_rotated == false) {
                    this.row_count = rows;
                    this.col_count = cols;
                }
                else {
                    this.row_count = rotated_rows;
                    this.col_count = rotated_cols;
                }
            };
            /**
             * 현재의 조판에, 단 한 장의 이미지라도 배치할 수 있는가를 알아본다.
             *
             * @return 조판 가능여부.
             */
            Placement.prototype.containable = function () {
                return (this.computePrintableWidth() >= this.image.getWidth() + 2 * this.image.getMargin()
                    && this.computePrintableHeight() >= this.image.getHeight() + 2 * this.image.getHeight())
                    || (this.computePrintableHeight() >= this.image.getWidth() + 2 * this.image.getMargin()
                        && this.computePrintableHeight() >= this.image.getHeight() + 2 * this.image.getHeight());
            };
            /**
             * <p> 현 조판의 행렬에 대하여 버림 연산을 행함. </p>
             *
             * <p> 한 조판면에 최대 배치 가능한 이미지의 수량은 8장이다. 또한, 접지를 행하기 때문에 각 행렬의 길이는 1 또는
             * 짝수의 숫자를 가져야만 한다. 때문에 각 행렬의 길이는 {0, 1, 2, 4} 중에 하나를 가지게 된다.. </p>
             *
             * @param val 버림을 행할 수
             * @return 버림연산을 행한 수
             */
            Placement.prototype.floor = function (val) {
                // ONLY 0 AND 1, 2, 4 IS PERMITTED
                var multiplier = Math.floor(Math.log(val) / Math.log(2));
                val = Math.pow(2.0, multiplier);
                if (val == 3)
                    return 2;
                else if (val >= 4)
                    return 4;
                else
                    return Math.floor(val);
            };
            /* =========================================================
                ACCESSROS
                     - MEMBRES
                     - PROPERTIES
                     - COLUMNS
                     - CALCULATORS
            ============================================================
                MEMBERS
            --------------------------------------------------------- */
            Placement.prototype.getProcess = function () {
                return this.process;
            };
            /**
             * Get 오프셋 장비.
             */
            Placement.prototype.getDevice = function () {
                return this.device;
            };
            /**
             * Get 용지.
             */
            Placement.prototype.getPaperSize = function () {
                return this.paper_size;
            };
            /**
             * Get 이미지.
             */
            Placement.prototype.getImage = function () {
                return this.image;
            };
            /**
             * Get 연관된 조판.
             */
            Placement.prototype.getLink = function () {
                return this.link;
            };
            /* ---------------------------------------------------------
                PROPERTIES
            --------------------------------------------------------- */
            /**
             * row size, number of row elements can be placed in.
             */
            Placement.prototype.row_size = function () {
                return this.row_count;
            };
            /**
             * cow size, number of column elements can be placed in.
             */
            Placement.prototype.col_size = function () {
                return this.col_count;
            };
            /**
             * <p> 현재의 조판면에 쌓을 수 있는 최대 이미지 수. </p>
             *
             * <p> 단, 아무리 많은 이미지를 배치 가능하더라도, 한 판면에 최대 배치 가능한 이미지 수는 오로지 8 장이다.  </p>
             *
             * @return 조판 가능한 최대 이미지 수 (0 ~ 8).
             */
            Placement.prototype.max_image_count = function () {
                var count = this.row_count * this.col_count;
                return Math.min(count, 8); // 8을 초과할 수 없다.
            };
            /**
             * Whether the placement is rotated.
             */
            Placement.prototype.rotated = function () {
                return this.is_rotated;
            };
            /**
             * 현재 각 판면에 배치된 이미지 수
             */
            Placement.prototype.image_count = function () {
                return this.image_count_;
            };
            /**
             * 현재의 배치를 사용하게 되는 판면 수.
             *
             * 한 부 내에서 쓰이는 판면 수만을 의미한다.
             * 전체 사본 부수와 돈땡 및 판걸이를 반영한 판면 수가 아님.
             */
            Placement.prototype.face_count = function () {
                return this.face_count_;
            };
            /**
             * Get 돈땡 분할 수.
             */
            Placement.prototype.inverse_count = function () {
                return this.inverse_count_;
            };
            /**
             * Get 판걸이 분할 수.
             */
            Placement.prototype.plaste_count = function () {
                return this.plaste_count_;
            };
            /**
             * <p> 현 조판이 유효한 지 검사한다. </p>
             *
             * <p> 유효성 검사는 오로지 양면 조판일 때만 행한다. 양편 조판이되 홀수의 조판면을 사용하는 경우, 그리고 돈땡이나
             * 판걸이 등의 분할을 행하지 않은 경우에 유효하지 않은 조판으로 간주된다. </p>
             *
             * @param side 양단면 코드.
             * @return 유효성.
             */
            Placement.prototype.validate = function (side) {
                // 연결관계 (공백 허가 조판) 에 있는 경우, 합산하고 시작함
                var face_count = this.face_count_;
                if (this.link != null)
                    face_count += this.link.face_count_;
                // 다음 경우엔 무조건적으로 유효함
                //	- 단면이거나,
                //	- 양면이더라도 짝수 판면수를 가지거나
                //	- 홀수의 판면수더라도 마지막 이미지 1장이 남은 경우 (또는 마지막 이미지 1장을 판걸이 한 경우)
                if (side == 1 || face_count % 2 == 0
                    || (this.link == null && (this.image_count_ / this.plaste_count_) == 1 && this.face_count_ == 1))
                    return true;
                //----
                // 여기서부터는 최소 양면 조판에 홀수 판면수를 가짐
                //----
                if (this.inverse_count_ > 1)
                    return true; // 돈땡의 경우 유효
                else
                    return false; // 그 외에는 무효
            };
            Object.defineProperty(Placement.prototype, "$width", {
                /* ---------------------------------------------------------
                    COLUMNS
                --------------------------------------------------------- */
                get: function () {
                    return folding.library.StringUtil.numberFormat(this.paper_size.getWidth()) + " mm";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Placement.prototype, "$height", {
                get: function () {
                    return folding.library.StringUtil.numberFormat(this.paper_size.getHeight()) + " mm";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Placement.prototype, "$image_count", {
                get: function () {
                    // 기본 텍스트
                    var ret = folding.library.StringUtil.numberFormat(this.image_count_) + " 장";
                    // 판걸이가 적용된 경우
                    if (this.plaste_count_ > 1) {
                        // 분수 맵을 생성
                        var fraction_symbol_map = new std.HashMap();
                        fraction_symbol_map.insert([2, "½"]);
                        fraction_symbol_map.insert([4, "¼"]);
                        fraction_symbol_map.insert([8, "⅛"]);
                        ret += " (P" + fraction_symbol_map.get(this.plaste_count_) + ")";
                    }
                    return ret;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Placement.prototype, "$paper_count", {
                get: function () {
                    return folding.library.StringUtil.numberFormat(this.face_count_) + " 판면";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Placement.prototype, "$copies", {
                get: function () {
                    // 기본 텍스트
                    var ret = folding.library.StringUtil.numberFormat(this.computeCopies()) + " 부";
                    //--------
                    // 돈땡 및 판걸이의 표기
                    //--------
                    // 분수기호 맵
                    var fraction_symbol_map = new std.HashMap();
                    fraction_symbol_map.insert([2, "½"]);
                    fraction_symbol_map.insert([4, "¼"]);
                    fraction_symbol_map.insert([8, "⅛"]);
                    if (this.inverse_count_ > 1 && this.plaste_count_ > 1) {
                        // 돈땡과 판걸이가 동시에 행해짐
                        ret += folding.library.StringUtil.substitute(" (I{1}, P{2})", fraction_symbol_map.get(this.inverse_count_), fraction_symbol_map.get(this.plaste_count_));
                    }
                    else if (this.inverse_count_ > 1) {
                        // 돈땡
                        ret += " (I" + fraction_symbol_map.get(this.inverse_count_) + ")";
                    }
                    else if (this.plaste_count_ > 1) {
                        // 판걸이
                        ret += " (P" + fraction_symbol_map.get(this.plaste_count_) + ")";
                    }
                    return ret;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Placement.prototype, "$rotated", {
                get: function () {
                    if (this.is_rotated == true)
                        return "TRUE";
                    else
                        return "";
                },
                enumerable: true,
                configurable: true
            });
            /* ---------------------------------------------------------
                CALCULATORS
            --------------------------------------------------------- */
            /**
             * 인쇄 가능 영역 中 가로 길이를 계산.
             */
            Placement.prototype.computePrintableWidth = function () {
                return this.paper_size.getWidth() - this.device.computeBitedWidth() - 2 * this.device.getNonPrintableWidth();
            };
            /**
             * 인쇄 가능 영역 中 세로 길이를 계산.
             */
            Placement.prototype.computePrintableHeight = function () {
                return this.paper_size.getHeight() - this.device.computeBitedHeight() - 2 * this.device.getNonPrintableHeight();
            };
            /**
             * (회전 후의) 이미지 가로 길이를 계산.
             */
            Placement.prototype.computeImageWidth = function () {
                return (this.is_rotated == false) ? this.image.getWidth() : this.image.getHeight();
            };
            /**
             * (회전 후의) 이미지 세로 길이를 계산.
             */
            Placement.prototype.computeImageHeight = function () {
                return (this.is_rotated == false) ? this.image.getHeight() : this.image.getWidth();
            };
            /**
             * <p> 사본 수를 계산한다. </p>
             *
             * <p> 보통은 부수를 따라가나, 돈땡이나 판걸이에 의해 사본 수가 줄어드는 경우가 있다. </p>
             *
             * @return 조정된 사본 수량.
             */
            Placement.prototype.computeCopies = function () {
                return Math.ceil(this.image.getCopies() / (this.inverse_count_ * this.plaste_count_));
            };
            /**
             * 공간 활용률을 계산한다; 최대 배치 가능 이미지 수 기준.
             *
             * @return 공간 활용률 (0 ~ 1).
             */
            Placement.prototype.computeSpaceUtilizationRatio = function () {
                var width = this.computeImageWidth();
                var height = this.computeImageHeight();
                var margin = this.image.getMargin();
                var numerator = this.image_count_ * (width + 2 * margin) * (height + 2 * margin);
                var denominator = this.computePrintableWidth() * this.computePrintableHeight();
                if (this.is_rotated == false && this.col_count > 1)
                    numerator -= this.image_count_ * margin * (height + 2 * margin);
                else if (this.is_rotated == true && this.row_count > 1)
                    numerator -= this.image_count_ * margin * (width + 2 * margin);
                return numerator / denominator;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Placement.prototype.TAG = function () {
                return "placement";
            };
            /**
             * @inheritdoc
             */
            Placement.prototype.CHILD_TAG = function () {
                return "wrap";
            };
            /**
             * @inheritdoc
             */
            Placement.prototype.toXML = function () {
                var xml = _super.prototype.toXML.call(this);
                if (this.paper_size != null)
                    xml.setProperty("paperSize", this.paper_size.getWidth() + "x" + this.paper_size.getHeight());
                return xml;
            };
            return Placement;
        }(folding.protocol.EntityArray));
        folding.Placement = Placement;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../../API.ts" />
/// <reference path="OptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        /**
         * <p> 톰슨 모형. </p>
         *
         * <ol>
         *	<li> 작업비 </li>
         *	<ul>
         *		<li> 고정비용: 30,000 원 </li>
         *		<li> 추가비용: 1,000 매 이후로 50 원 / 매 </li>
         *	</ul>
         *	<li> 한 판 칼비 (도장, 판 only) </li>
         *	<ul>
         *		<li> 5,000 원 / m </li>
         *		<li> 추후 복잡도에 따라 가격이 변할 수 있다. </li>
         *	</ul>
         * </ol>
         *
         * <h3> 비고 </h3>
         * <ul>
         *	<li> 여유 용지: 면당 30매 </li>
         *	<li> 톰슨은 컷팅 행위를 행하기에 양/단면 구분이 없다. 오로지 단면만 존재함. </li>
         * </ul>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var ThomsonModel = (function (_super) {
            __extends(ThomsonModel, _super);
            function ThomsonModel() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            // using super::constructor
            /**
             * @inheritdoc
             */
            ThomsonModel.prototype.init = function () {
                // BASE MEMBERS
                this.used = false;
                this.sparePapers = 30;
                // SPECIFIED MEMBERS
                this.workBasePrice = 30000;
                this.workBaseFaces = 1000;
                this.workOverPrice = 50;
                this.cuttingPrice = 5000;
                // TEMPORARY MEMBERS
                this.__cuttingLength = 5;
            };
            /* =========================================================
                ACCESSROS
                    - COMPUTES
                    - GETTERS
                    - SETTERS
            ============================================================
                COMPUTES
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ThomsonModel.prototype.computePrice = function () {
                if (this.isUsed() == false)
                    return 0;
                // 톰슨 가격 = 기본작업비 + 추가작업비 + 칼비
                return this.compute_base_work_price()
                    + this.compute_over_work_price()
                    + this.compute_cutting_price();
            };
            ThomsonModel.prototype.compute_base_work_price = function () {
                return this.process.computeFaceCount() * this.workBasePrice;
            };
            ThomsonModel.prototype.compute_over_work_price = function () {
                return this.compute_over_faces() * this.workOverPrice;
            };
            ThomsonModel.prototype.compute_over_faces = function () {
                var faces = 0;
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    var my_faces = Math.max(0, placement.computeCopies() - this.workBaseFaces);
                    my_faces *= placement.face_count();
                    faces += my_faces;
                }
                return faces;
            };
            ThomsonModel.prototype.compute_cutting_length = function () {
                return this.process.getImage().getPages() * this.__cuttingLength;
                //let length: number = 0;
                //for (let i: number = 0; i < this.process.size(); i++)
                //	length += this.process.at(i).image_count() * this.__cuttingLength;
                //return length;
            };
            ThomsonModel.prototype.compute_cutting_price = function () {
                // 5,000원 / m
                // 현재 길이 및 복잡도를 특정할 방법이 없음, 임시변수를 사용
                return this.cuttingPrice * this.compute_cutting_length();
            };
            /* ---------------------------------------------------------
                GETTERS
            --------------------------------------------------------- */
            ThomsonModel.prototype.getWorkUnitPrice = function () {
                return this.workBasePrice;
            };
            ThomsonModel.prototype.getWorkUnitFaces = function () {
                return this.workBaseFaces;
            };
            ThomsonModel.prototype.getWorkSurplusPrice = function () {
                return this.workOverPrice;
            };
            ThomsonModel.prototype.getCuttingPrice = function () {
                return this.cuttingPrice;
            };
            ThomsonModel.prototype.$getCuttingLength = function () {
                return this.__cuttingLength;
            };
            /* ---------------------------------------------------------
                SETTERS
            --------------------------------------------------------- */
            ThomsonModel.prototype.setWorkUnitPrice = function (val) {
                this.workBasePrice = val;
            };
            ThomsonModel.prototype.setWorkUnitFaces = function (val) {
                this.workBaseFaces = val;
            };
            ThomsonModel.prototype.setWorkSurplusPrice = function (val) {
                this.workOverPrice = val;
            };
            ThomsonModel.prototype.setCuttingPrice = function (val) {
                this.cuttingPrice = val;
            };
            ThomsonModel.prototype.$setCuttingLength = function (val) {
                this.__cuttingLength = val;
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ThomsonModel.prototype.TAG = function () {
                return "thomson";
            };
            /**
             * @inheritdoc
             */
            ThomsonModel.prototype.toGridRows = function () {
                if (this.isUsed() == false)
                    return [];
                var faces = this.process.computeFaceCount() * this.process.getImage().getCopies();
                var stair_price = this.workBasePrice * Math.floor(faces / this.workBaseFaces);
                var surplus_price = this.workOverPrice * (faces % this.workBaseFaces);
                var rows = [
                    ////////
                    // 합계
                    ////////
                    {
                        name: "톰슨",
                        price: this.computePrice(),
                        comment: "톰슨비 = 기본작업비 + 추가작업비 + 칼비"
                    },
                    ////////
                    // 작업비
                    ////////
                    {
                        name: "\t기본 작업비",
                        sub_price: this.compute_base_work_price(),
                        comment: folding.library.StringUtil.substitute("총 {1} 판면 x {2} 원 / 판면", folding.library.StringUtil.numberFormat(this.process.computeFaceCount()), folding.library.StringUtil.numberFormat(this.workBasePrice))
                    },
                    {
                        name: "\t추가 작업비",
                        sub_price: this.compute_over_work_price(),
                        comment: folding.library.StringUtil.substitute("{1} 판면부터 {2} 원씩, 총 {3} 판면 초과", folding.library.StringUtil.numberFormat(this.workBaseFaces), folding.library.StringUtil.numberFormat(this.workOverPrice), folding.library.StringUtil.numberFormat(this.compute_over_faces()))
                    }
                ].concat(this.toGridRows_units(), [
                    ////////
                    // 칼비
                    ////////
                    {
                        name: "\t칼비",
                        sub_price: this.compute_cutting_price(),
                        comment: folding.library.StringUtil.numberFormat(this.cuttingPrice) + " 원 / m"
                    },
                    {
                        name: "\t\t칼 길이",
                        comment: folding.library.StringUtil.numberFormat(this.compute_cutting_length()) + " m"
                    }
                ]);
                return rows;
            };
            ThomsonModel.prototype.toGridRows_units = function () {
                var rows = [];
                for (var i = 0; i < this.process.size(); i++) {
                    var placement = this.process.at(i);
                    if (placement.computeCopies() <= this.workBaseFaces)
                        continue;
                    var over_faces = placement.face_count() * (placement.computeCopies() - this.workBaseFaces);
                    var over_price = over_faces * this.workOverPrice;
                    var row = {
                        name: folding.library.StringUtil.substitute("\t\t{1}. {2} x {3}", i + 1, folding.library.StringUtil.numberFormat(placement.getPaperSize().getWidth()), folding.library.StringUtil.numberFormat(placement.getPaperSize().getHeight())),
                        comment: folding.library.StringUtil.substitute("{1}, {2} -> {3} 판면 초과", placement.$paper_count, placement.$copies, folding.library.StringUtil.numberFormat(over_faces))
                    };
                    rows.push(row);
                }
                return rows;
            };
            return ThomsonModel;
        }(folding.OptionalModel));
        folding.ThomsonModel = ThomsonModel;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var Wrap = (function (_super) {
            __extends(Wrap, _super);
            function Wrap(placement, row, col) {
                if (row === void 0) { row = -1; }
                if (col === void 0) { col = -1; }
                _super.call(this);
                this.placement = placement;
                this.row = row;
                this.col = col;
            }
            /* ---------------------------------------------------------
                COMPUTATORS
            --------------------------------------------------------- */
            Wrap.prototype.computeSector = function () {
                var device = this.placement.getDevice();
                var rect = {};
                {
                    rect.width = this.placement.computePrintableWidth() / this.placement.col_size();
                    rect.height = this.placement.computePrintableHeight() / this.placement.row_size();
                    rect.x =
                        device.computeBitedWidth() + device.getNonPrintableWidth() +
                            this.placement.computePrintableWidth() * this.col / this.placement.col_size();
                    rect.y =
                        device.computeBitedHeight() + device.getNonPrintableHeight() +
                            this.placement.computePrintableHeight() * this.row / this.placement.row_size();
                }
                return rect;
            };
            Wrap.prototype.computeMargin = function () {
                var image = this.placement.getImage();
                var point = this.computePoint();
                var margin = {};
                if (this.placement.rotated() == false) {
                    // HEIGHT AND Y POINT ARE FIXED
                    margin.height = this.placement.computeImageHeight() + 2 * image.getMargin();
                    margin.y = point.y - image.getMargin();
                    if (this.placement.col_size() == 1) {
                        // MARGIN ON BOTH LEFT AND RIGHT
                        margin.width = this.placement.computeImageWidth() + 2 * image.getMargin();
                        margin.x = point.x - image.getMargin();
                    }
                    else if (this.col % 2 == 0) {
                        // MARGIN ON LEFT
                        margin.width = this.placement.computeImageWidth() + image.getMargin();
                        margin.x = point.x - image.getMargin();
                    }
                    else {
                        // MARGIN ON RIGHT
                        margin.width = this.placement.computeImageWidth() + image.getMargin();
                        margin.x = point.x;
                    }
                }
                else {
                    // WIDTH AND X POINT ARE FIXED
                    margin.width = this.placement.computeImageWidth() + 2 * image.getMargin();
                    margin.x = point.x - image.getMargin();
                    if (this.placement.row_size() == 1) {
                        // MARGIN ON BOTH TOP AND BOTTOM
                        margin.height = this.placement.computeImageHeight() + 2 * image.getMargin();
                        margin.y = point.y - image.getMargin();
                    }
                    else if (this.row % 2 == 0) {
                        // MARGIN ON TOP
                        margin.height = this.placement.computeImageHeight() + image.getMargin();
                        margin.y = point.y - image.getMargin();
                    }
                    else {
                        // MARGIN ON BOTTOM
                        margin.height = this.placement.computeImageHeight() + image.getMargin();
                        margin.y = point.y;
                    }
                }
                return margin;
            };
            Wrap.prototype.computePoint = function () {
                var sector = this.computeSector();
                var x;
                var y;
                if (this.placement.rotated() == false) {
                    y = sector.y + (sector.height - this.placement.computeImageHeight()) / 2.0;
                    if (this.placement.col_size() == 1) {
                        // ONLY A COL -> CENTER ALIGN
                        x = sector.x + (sector.width - this.placement.computeImageWidth()) / 2.0;
                    }
                    else if (this.col % 2 == 0) {
                        // EVEN NUMBER -> RIGHT ALIGN
                        x = (sector.x + sector.width) - this.placement.computeImageWidth();
                    }
                    else {
                        // ODD NUMBER -> LEFT ALIGN
                        x = sector.x;
                    }
                }
                else {
                    x = sector.x + (sector.width - this.placement.computeImageWidth()) / 2.0;
                    if (this.placement.row_size() == 1) {
                        // ONLY A ROW -> CENTER ALIGN
                        y = sector.y + (sector.height - this.placement.computeImageHeight()) / 2.0;
                    }
                    else if (this.row % 2 == 0) {
                        // EVEN NUMBER -> BOTTOM ALIGN
                        y = (sector.y + sector.height) - this.placement.computeImageHeight();
                    }
                    else {
                        // ODD NUMBER -> LEFT ALIGN
                        y = sector.y;
                    }
                }
                return { x: x, y: y };
            };
            /* ---------------------------------------------------------
                EXPORTERS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Wrap.prototype.TAG = function () {
                return "wrap";
            };
            return Wrap;
        }(folding.protocol.Entity));
        folding.Wrap = Wrap;
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var flex;
(function (flex) {
    var TabNavigator = (function (_super) {
        __extends(TabNavigator, _super);
        function TabNavigator() {
            _super.apply(this, arguments);
        }
        TabNavigator.prototype.render = function () {
            if (this.state == null)
                this.state = { selectedIndex: this.props.selectedIndex };
            if (this.state.selectedIndex == undefined)
                this.state = { selectedIndex: 0 };
            var children = this.props.children;
            var selected = children[this.state.selectedIndex];
            var tabs = [];
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var className = (i == this.state.selectedIndex) ? "active" : "";
                var label = React.createElement("li", {key: i, className: "tabNavigator_label"}, React.createElement("a", {href: "#", className: className, onClick: this.handle_change.bind(this, i)}, child.props.label));
                tabs.push(label);
            }
            var ret = React.createElement("div", {className: "tabNavigator", style: this.props.style}, React.createElement("ul", {className: "tabNavigator_label"}, tabs), selected);
            return ret;
        };
        TabNavigator.prototype.handle_change = function (index, event) {
            this.setState({ selectedIndex: index });
        };
        return TabNavigator;
    }(React.Component));
    flex.TabNavigator = TabNavigator;
    var NavigatorContent = (function (_super) {
        __extends(NavigatorContent, _super);
        function NavigatorContent() {
            _super.apply(this, arguments);
        }
        NavigatorContent.prototype.render = function () {
            return React.createElement("div", {className: "tabNavigator_content"}, this.props.children);
        };
        return NavigatorContent;
    }(React.Component));
    flex.NavigatorContent = NavigatorContent;
})(flex || (flex = {}));
//# sourceMappingURL=folding.js.map
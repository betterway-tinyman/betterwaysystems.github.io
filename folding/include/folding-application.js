/// <reference types="tstl" />
/// <reference types="samchon-framework" />
/**
 * 코어 연산부.
 *
 * 모듈 {@link core} 는 오프셋 견적을 계산해내는 코어 연산부이다.
 *
 * 모든 연산의 시작은 {@link ProcessArray} 객체로부터 시작한다. {@link ProcessArray} 객체를 생성하자.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * Shorcut of {@link samchon.library}.
             */
            core.library = samchon.library;
            /**
             * Shorcut of {@link samchon.collection}.
             */
            core.collections = samchon.collections;
            /**
             * Shorcut of {@link samchon.protocol}.
             */
            core.protocol = samchon.protocol;
            var Side;
            (function (Side) {
                /**
                 * 단면.
                 */
                Side[Side["SINGLE"] = 1] = "SINGLE";
                /**
                 * 양면.
                 */
                Side[Side["DOUBLE"] = 2] = "DOUBLE";
                /**
                 * 앞면.
                 */
                Side[Side["FRONT"] = 1] = "FRONT";
                /**
                 * 뒷면.
                 */
                Side[Side["BACK"] = 2] = "BACK";
            })(Side = core.Side || (core.Side = {}));
            var Direction;
            (function (Direction) {
                Direction[Direction["HORIZONTAL"] = 1] = "HORIZONTAL";
                Direction[Direction["VERTICAL"] = 2] = "VERTICAL";
                Direction[Direction["UP"] = 8] = "UP";
                Direction[Direction["DOWN"] = 2] = "DOWN";
                Direction[Direction["LEFT"] = 4] = "LEFT";
                Direction[Direction["RIGHT"] = 6] = "RIGHT";
            })(Direction = core.Direction || (core.Direction = {}));
            /**
             * 초기 설정값.
             */
            var Initial = (function () {
                function Initial() {
                }
                Object.defineProperty(Initial, "SIDE", {
                    get: function () { return Side.DOUBLE; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Initial, "PAGES", {
                    get: function () { return 15; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Initial, "COPIES", {
                    get: function () { return 1; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Initial, "FOLD", {
                    get: function () { return true; },
                    enumerable: true,
                    configurable: true
                });
                return Initial;
            }());
            core.Initial = Initial;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="react-data-grid" />
/// <reference types="three" />
/// <reference types="tstl" />
/// <reference types="samchon-framework" />
/// <reference path="../core/API.ts" />
/**
 * UI 어플리케이션.
 *
 * 모듈 {@application} 은 코어 연산부 {@link core} 모듈에 대한 시각화를 구현한, UI 어플리케이션이다.
 *
 * UI 어플리케이션을 화면에 띄우려거든, {@link Application.main} 을 호출하면 된다.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
            /**
             * Shorcut of {@link samchon.library}.
             */
            application.library = samchon.library;
            /**
             * Shorcut of {@link samchon.collection}.
             */
            application.collections = samchon.collections;
            /**
             * Shorcut of {@link samchon.protocol}.
             */
            application.protocol = samchon.protocol;
            application.Direction = folding.core.Direction;
            application.Side = folding.core.Side;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
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
                    var _this = _super.call(this) || this;
                    _this.process_array_ = new folding.core.ProcessArray();
                    return _this;
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
                    // 조건 검증
                    var error_list = this.process_array_.validate();
                    if (error_list.empty() == false) {
                        var msg = "";
                        for (var it = error_list.begin(); !it.equals(error_list.end()); it = it.next())
                            msg += it.value + "\n\n";
                        alert(msg);
                    }
                    // 접지 실시
                    this.process_array_.optimize();
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
                    this.process_array_.init();
                    // 및 새로고침
                    this._Refresh();
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
                            var xml = new application.library.XML(file_ref.data);
                            this_.process_array_.construct(xml);
                            this_._Refresh();
                        }
                        catch (exception) { }
                    };
                    var file_ref = new application.library.FileReference();
                    file_ref.addEventListener("select", handle_select);
                    file_ref.addEventListener("complete", handle_complete);
                    file_ref.browse();
                };
                /**
                 * 파일 저장하기 버튼 클릭.
                 */
                Application.prototype.save = function (event) {
                    var str = "<?xml version='1.0' ?>\n" + this.process_array_.toXML().toString();
                    var file_ref = new application.library.FileReference();
                    file_ref.save(str, "folding.xml");
                };
                /* ---------------------------------------------------------
                    RENDERERS
                --------------------------------------------------------- */
                /**
                 * 화면 갱신.
                 */
                Application.prototype._Refresh = function () {
                    this.setState({});
                };
                /**
                 * React 렌더링 함수.
                 */
                Application.prototype.render = function () {
                    return React.createElement("div", { width: "100%", height: "100%" },
                        React.createElement("table", { style: { textAlign: "center" } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    " ",
                                    React.createElement("img", { src: "images/newFile.png", onClick: this.clear.bind(this) }),
                                    " "),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement("img", { src: "images/openFile.png", onClick: this.open.bind(this) }),
                                    " "),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement("img", { src: "images/saveFile.png", onClick: this.save.bind(this) }),
                                    " "),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement("img", { src: "images/retrieve.png", onClick: this.optimize.bind(this) }),
                                    " ")),
                            React.createElement("tr", null,
                                React.createElement("td", null, " New File "),
                                React.createElement("td", null, " Open File "),
                                React.createElement("td", null, " Save File "),
                                React.createElement("td", null, " Calculate "))),
                        React.createElement(flex.TabNavigator, { ref: "tabNavigator", style: { width: 550, height: "100%", float: "left" } },
                            React.createElement(flex.NavigatorContent, { label: "Item Editor" },
                                React.createElement(application.ProcessArrayEditor, { processArray: this.process_array_ })),
                            React.createElement(flex.NavigatorContent, { label: "Result Viewer" },
                                React.createElement(application.ProcessArrayViewer, { processArray: this.process_array_ }))),
                        React.createElement("div", { id: "placement_div", style: { float: "left" } }));
                };
                /**
                 * Start Application.
                 */
                Application.main = function () {
                    ReactDOM.render(React.createElement(Application, null), document.body);
                };
                return Application;
            }(React.Component));
            application.Application = Application;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
            /**
             * 프로세스 및 종이모형 리스트 편집기.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var ItemEditor = (function (_super) {
                __extends(ItemEditor, _super);
                function ItemEditor() {
                    var _this = _super.apply(this, arguments) || this;
                    /**
                     * 선택된 종이모형 번호.
                     */
                    _this.selected_paper_index_ = 0;
                    /**
                     * 선택된 종이크기 번호.
                     */
                    _this.selected_paper_size_index_ = -1;
                    return _this;
                }
                Object.defineProperty(ItemEditor.prototype, "selected_paper_", {
                    /**
                     * 선택된 종이모형 getter
                     */
                    get: function () {
                        try {
                            return this.props.paperArray.at(this.selected_paper_index_);
                        }
                        catch (exception) {
                            return null;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemEditor.prototype, "selected_paper_size_", {
                    /**
                     * 선택된 종이크기 getter
                     */
                    get: function () {
                        try {
                            return this.selected_paper_.at(this.selected_paper_size_index_);
                        }
                        catch (exception) {
                            return null;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /* =========================================================
                    RENDERERS
                        - PROCESS ITEMS
                        - GLOBAL EDITORS
                ============================================================
                    PROCESS ITEMS
                --------------------------------------------------------- */
                /**
                 * <p> 새로고침. </p>
                 *
                 * <p> 각 그리드의 목록을 갱신하고, Device와 ImageModel의 에디터를 다시 렌더링한다. </p>
                 */
                ItemEditor.prototype.refresh = function () {
                    //let div_elements: HTMLElement[] =
                    //	[
                    //		document.getElementById("device_editor_div"),
                    //		document.getElementById("image_editor_div"),
                    //		document.getElementById("cutter_editor_div")
                    //	];
                    //let react_elements: JSX.Element[] = [];
                    // HAVE NOT RENDERED YET
                    if (!document.getElementById("device_editor_div"))
                        return;
                    // REFRESH DATA GRID
                    this.setState({});
                    // CONSTRUCT ELEMENTS TO REFRESHED HARDLY
                    var div_elements = [
                        std.make_pair(document.getElementById("device_editor_div"), this._Render_device_editor()),
                        std.make_pair(document.getElementById("image_editor_div"), this._Render_image_editor()),
                        std.make_pair(document.getElementById("cutter_editor_div"), this._Render_cutter_editor())
                    ];
                    for (var i = 0; i < div_elements.length; i++) {
                        var pair = div_elements[i];
                        var div = pair.first;
                        var jsx = pair.second;
                        // CLEAR ORDINARY CONTENT
                        if (div.children.length != 0)
                            div.removeChild(div.children[0]);
                        // INSERT REFRESHED ITEM
                        ReactDOM.render(jsx, div);
                    }
                };
                /**
                 * React 렌더링 함수.
                 */
                ItemEditor.prototype.render = function () {
                    return React.createElement("div", { id: "item_editor_div" },
                        React.createElement("div", { id: "device_editor_div" }, this._Render_device_editor()),
                        React.createElement("div", { id: "image_editor_div" }, this._Render_image_editor()),
                        React.createElement("div", { id: "cutter_editor_div" }, this._Render_cutter_editor()),
                        React.createElement("div", { id: "paper_editor_div" },
                            this._Render_paper_editor(),
                            this._Render_paper_size_editor()));
                };
                /**
                 * 장치 에디터 렌더링 함수.
                 */
                ItemEditor.prototype._Render_device_editor = function () {
                    var device = this.props.process.getDevice();
                    return React.createElement("div", null,
                        React.createElement("h2", null, " \uC624\uD504\uC14B \uC7A5\uCE58 \uC815\uBCF4 "),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                " \uAD6C\uC640\uC774",
                                React.createElement("ul", null,
                                    React.createElement("li", null,
                                        " \uAE38\uC774:",
                                        React.createElement("input", { type: "number", defaultValue: device.getBiteLength() + "", onChange: this._Change_member_value.bind(this, device.setBiteLength.bind(device)) })),
                                    React.createElement("li", null,
                                        " \uBC29\uD5A5:",
                                        React.createElement("select", { onChange: this._Change_member_value.bind(this, device.setBiteDirection.bind(device)) },
                                            React.createElement("option", { value: application.Direction.HORIZONTAL + "", selected: device.getBiteDirection() == application.Direction.HORIZONTAL }, "\uAC00\uB85C"),
                                            React.createElement("option", { value: application.Direction.VERTICAL + "", selected: device.getBiteDirection() == application.Direction.VERTICAL }, "\uC138\uB85C"))))),
                            React.createElement("li", null,
                                " \uC778\uC1C4 \uBD88\uAC00\uB2A5 \uC601\uC5ED",
                                React.createElement("ul", null,
                                    React.createElement("li", null,
                                        " \uAC00\uB85C:",
                                        React.createElement("input", { type: "number", defaultValue: device.getNonPrintableWidth() + "", onChange: this._Change_member_value.bind(this, device.setNonPrintableWidth.bind(device)) })),
                                    React.createElement("li", null,
                                        " \uC138\uB85C:",
                                        React.createElement("input", { type: "number", defaultValue: device.getNonPrintableHeight() + "", onChange: this._Change_member_value.bind(this, device.setNonPrintableHeight.bind(device)) })))),
                            React.createElement("li", null,
                                " \uC811\uC9C0 \uC5EC\uBD80",
                                React.createElement("input", { type: "checkbox", defaultChecked: device.isFolding(), onChange: this._Change_member_enabled.bind(this, device.setFolding.bind(device)) }))));
                };
                /**
                 * 이미지 에디터 렌더링 함수.
                 */
                ItemEditor.prototype._Render_image_editor = function () {
                    var image = this.props.process.getImage();
                    return React.createElement("div", null,
                        React.createElement("h2", null, " \uC774\uBBF8\uC9C0 \uC815\uBCF4 "),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                " \uAC00\uB85C \uAE38\uC774:",
                                React.createElement("input", { type: "number", defaultValue: image.getWidth() + "", onChange: this._Change_member_value.bind(this, image.setWidth.bind(image)) }),
                                " mm"),
                            React.createElement("li", null,
                                " \uC138\uB85C \uAE38\uC774:",
                                React.createElement("input", { type: "number", defaultValue: image.getHeight() + "", onChange: this._Change_member_value.bind(this, image.setHeight.bind(image)) }),
                                " mm"),
                            React.createElement("li", null,
                                " \uD398\uC774\uC9C0 \uC218:",
                                React.createElement("input", { type: "number", defaultValue: image.getPages() + "", onChange: this._Change_member_value.bind(this, image.setPages.bind(image)) }),
                                " \uD398\uC774\uC9C0"),
                            React.createElement("li", null,
                                " \uC0AC\uBCF8:",
                                React.createElement("input", { type: "number", defaultValue: image.getCopies() + "", onChange: this._Change_member_value.bind(this, image.setCopies.bind(image)) }),
                                " \uBD80"),
                            React.createElement("li", null,
                                " \uC5EC\uBC31:",
                                React.createElement("input", { type: "number", defaultValue: image.getMargin() + "", onChange: this._Change_member_value.bind(this, image.setMargin.bind(image)) }),
                                " mm"),
                            React.createElement("li", null,
                                " \uBC29\uD5A5:",
                                React.createElement("select", { onChange: this._Change_member_value.bind(this, image.setBindingDirection.bind(image)) },
                                    React.createElement("option", { value: application.Direction.UP + "", selected: image.getBindingDirection() == application.Direction.UP }, "\uC0C1\uCCA0"),
                                    React.createElement("option", { value: application.Direction.LEFT + "", selected: image.getBindingDirection() == application.Direction.LEFT }, "\uC88C\uCCA0"),
                                    React.createElement("option", { value: application.Direction.RIGHT + "", selected: image.getBindingDirection() == application.Direction.RIGHT }, "\uC6B0\uCCA0"),
                                    React.createElement("option", { value: application.Direction.DOWN + "", selected: image.getBindingDirection() == application.Direction.DOWN }, "\uD558\uCCA0")))));
                };
                /* ---------------------------------------------------------
                    GLOBAL EDITORS
                --------------------------------------------------------- */
                ItemEditor.prototype._Render_cutter_editor = function () {
                    var cutter = this.props.cutter;
                    return React.createElement("div", null,
                        React.createElement("h2", null, " \uC7AC\uB2E8 \uC815\uBCF4 "),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                " \uC791\uC5C5\uBE44:",
                                React.createElement("input", { type: "number", defaultValue: cutter.getWorkingPrice() + "", onChange: this._Change_member_value.bind(this, cutter.setWorkingPrice.bind(cutter)) }),
                                " \uC6D0" + " " + "/",
                                React.createElement("input", { type: "number", defaultValue: cutter.getWorkingSheets() + "", onChange: this._Change_member_value.bind(this, cutter.setWorkingSheets.bind(cutter)) }),
                                " \uC7A5"),
                            React.createElement("li", null,
                                " \uC808\uB2E8\uBE44:",
                                React.createElement("input", { type: "number", defaultValue: cutter.getCuttingPrice() + "", onChange: this._Change_member_value.bind(this, cutter.setCuttingPrice.bind(cutter)) }),
                                "\uC6D0 / \uD68C")));
                };
                /**
                 * 용지모형 편집기 및 그리드 렌더러.
                 */
                ItemEditor.prototype._Render_paper_editor = function () {
                    var columns = [
                        { key: "$name", name: "이름", editable: true, width: 225 },
                        { key: "$price", name: "가격 / m²", editable: true, width: 225 }
                    ];
                    if (this.props.paperArray.hasEventListener("insert") == false) {
                        this.props.paperArray.addEventListener("insert", this._Handle_collection_event, this);
                        this.props.paperArray.addEventListener("erase", this._Handle_collection_event, this);
                        this.props.paperArray.addEventListener("refresh", this._Handle_collection_event, this);
                    }
                    return React.createElement("div", null,
                        React.createElement("h2", null, " \uC6A9\uC9C0 \uC885\uB958 "),
                        React.createElement(ReactDataGrid, { rowGetter: this._Fetch_paper_row.bind(this), rowsCount: this.props.paperArray.size(), columns: columns, onCellSelected: this._Handle_paper_select.bind(this), onRowUpdated: this._Handle_paper_updated.bind(this), enableCellSelect: true, minHeight: 40 + this.props.paperArray.size() * 35 }),
                        React.createElement("p", { style: { textAlign: "right" } },
                            React.createElement("button", { onClick: this._Insert_paper.bind(this) }, " \uCD94\uAC00 "),
                            React.createElement("button", { onClick: this._Erase_paper.bind(this) }, " \uC0AD\uC81C ")));
                };
                /**
                 * 용지크기 그리드 렌더러.
                 */
                ItemEditor.prototype._Render_paper_size_editor = function () {
                    var columns = [
                        { key: "$width", name: "가로", editable: true, width: 225 },
                        { key: "$height", name: "세로", editable: true, width: 225 }
                    ];
                    return React.createElement("div", null,
                        React.createElement("h2", null, " \uC6A9\uC9C0 \uD06C\uAE30 "),
                        React.createElement(ReactDataGrid, { ref: "paper_size_grid", rowGetter: this._Fetch_paper_size_row.bind(this), rowsCount: this.selected_paper_ == null ? 0 : this.selected_paper_.size(), columns: columns, onCellSelected: this._Handle_paper_size_select.bind(this), onRowUpdated: this._Handle_paper_size_updated.bind(this), enableCellSelect: true, minHeight: Math.min(400, 40 + (this.selected_paper_ == null ? 0 : this.selected_paper_.size() * 35)) }),
                        React.createElement("p", { style: { textAlign: "right" } },
                            React.createElement("button", { onClick: this._Insert_paper_size.bind(this) }, " \uCD94\uAC00 "),
                            React.createElement("button", { onClick: this._Erase_paper_size.bind(this) }, " \uC0AD\uC81C ")));
                };
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * 이벤트 리스터 who calls 타깃 엔티티의 멤버 setter 함수.
                 *
                 * @param setter 세터 함수
                 * @param event Form 편집으로 인해 발생한 이벤트 객체
                 */
                ItemEditor.prototype._Change_member_value = function (setter, event) {
                    var value = Number(event.target.value);
                    setter(value);
                };
                ItemEditor.prototype._Change_member_enabled = function (setter, event) {
                    setter(event.target.checked);
                };
                /**
                 * DataProvider for 종이모형 리스트 그리드
                 */
                ItemEditor.prototype._Fetch_paper_row = function (index) {
                    try {
                        return this.props.paperArray.at(index);
                    }
                    catch (exception) {
                        return null;
                    }
                };
                /**
                 * DataProvider for 종이크기 리스트 그리드
                 */
                ItemEditor.prototype._Fetch_paper_size_row = function (index) {
                    try {
                        return this.selected_paper_.at(index);
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
                /**
                 * 용지모형 선택 이벤트, from 용지모형 리스트 그리드, 핸들러.
                 */
                ItemEditor.prototype._Handle_paper_select = function (event) {
                    try {
                        this.selected_paper_index_ = event.rowIdx;
                        this.props.process.setPaper(this.selected_paper_);
                        this.refresh();
                    }
                    catch (exception) { }
                };
                /**
                 * 용지모형 멤버 데이터 편집 이벤트, from 용지모형 리스트 그리드, 핸들러.
                 */
                ItemEditor.prototype._Handle_paper_updated = function (event) {
                    Object.assign(this.selected_paper_, event.updated);
                    this.props.paperArray.refresh(this.props.paperArray.begin().advance(event.rowIdx));
                };
                /**
                 * 용지크기 선택 이벤트, from 용지크기 리스트 (a 용지모형) 그리드, 핸들러.
                 */
                ItemEditor.prototype._Handle_paper_size_select = function (event) {
                    this.selected_paper_size_index_ = event.rowIdx;
                };
                /**
                 * 용지크기 멤버 데이터 편집 이벤트, from 용지크기 리스트 (a 용지모형) 그리드, 핸들러.
                 */
                ItemEditor.prototype._Handle_paper_size_updated = function (event) {
                    Object.assign(this.selected_paper_size_, event.updated);
                    this.selected_paper_.refresh(this.selected_paper_.begin().advance(event.rowIdx));
                };
                /* ---------------------------------------------------------
                    ELEMENTS I/O
                --------------------------------------------------------- */
                /**
                 * <p> 그리드 DataProvider (Entity) 들에서 발생한 CollectionEvent 핸들러. 다음과 같은 상황에서 발생하는 이벤트를
                 * 다룸 </p>
                 *
                 * <ul>
                 *	<li> 삽입 </li>
                 *	<li> 삭제 </ii>
                 *	<li> 갱신 (편집) </li>
                 * </ul>
                 *
                 * @param event 컬렉션 이벤트 객체.
                 */
                ItemEditor.prototype._Handle_collection_event = function (event) {
                    // Array 컨테이너의 collection 이벤트 발생은 선행적임.
                    // setTimeout 을 통하여, elements i/o 연산이 이뤄진 후에 refresh 가 불러지게끔 한다.
                    setTimeout(this.refresh.bind(this), 0);
                };
                /**
                 * 용지모형 추가버튼 클릭.
                 */
                ItemEditor.prototype._Insert_paper = function (event) {
                    this.props.paperArray.push_back(new folding.core.PaperModel());
                };
                /**
                 * 용지모형 삭제버튼 클릭.
                 */
                ItemEditor.prototype._Erase_paper = function (event) {
                    try {
                        var it = this.props.paperArray.begin().advance(this.selected_paper_index_);
                        this.props.paperArray.erase(it);
                    }
                    catch (exception) { }
                };
                /**
                 * 용지크기 추가버튼 클릭.
                 */
                ItemEditor.prototype._Insert_paper_size = function (event) {
                    var svg;
                    try {
                        this.selected_paper_.push_back(new folding.core.PaperSize());
                        this.refresh();
                    }
                    catch (exception) { }
                };
                /**
                 * 용지모형 삭제버튼 클릭
                 */
                ItemEditor.prototype._Erase_paper_size = function (event) {
                    try {
                        var it = this.selected_paper_.begin().advance(this.selected_paper_size_index_);
                        this.selected_paper_.erase(it);
                        this.refresh();
                    }
                    catch (exception) { }
                };
                return ItemEditor;
            }(React.Component));
            application.ItemEditor = ItemEditor;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding_1) {
        var application;
        (function (application) {
            /**
             * 조판면 내 각 페이지의 배치를 보여줌.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var PlacementViewer = (function (_super) {
                __extends(PlacementViewer, _super);
                function PlacementViewer() {
                    return _super.apply(this, arguments) || this;
                }
                // using super.constructor
                /* ---------------------------------------------------------
                    COMPUTATIONS
                --------------------------------------------------------- */
                /**
                 * 페이지의 배치 순서 및 방향을 담은 행렬을 계산해낸다.
                 *
                 * @param placement 조판면 배치 정보.
                 * @param side 앞뒷면 코드
                 *
                 * @returns 페이지 번호 및 방향을 원소로 가지는 행렬.
                 */
                PlacementViewer.prototype._Compute_page_matrix = function (placement, side) {
                    var process = placement.getProcess();
                    var image = process.getImage();
                    // 전체 행렬의 크기 구성
                    var row_size = placement.row_size();
                    var col_size = placement.col_size();
                    // 조판면에 페이지가 회전배치된 경우, 행렬 크기도 뒤집혀야 함
                    if (placement.isRotated() == true)
                        _a = [col_size, row_size], row_size = _a[0], col_size = _a[1];
                    //--------
                    // 부분 행렬 구성
                    //	- 돈땡이나 판걸이에 의해서 보다 작은 용지로의 접지 및 배치가 이루어지고
                    //  - 이를 본래 크기의 용지에 확대 및 배치하는 과정이 있다.
                    //--------
                    // 부분 행렬
                    var sub_matrix;
                    // 돈땡, 판걸이 횟수에 따른, 부분 행의 크기를 계산하고
                    var sub_row_size = row_size;
                    var sub_col_size = col_size;
                    var inversed_direction;
                    // 판걸이를 고려
                    for (var i = 0; i < Math.log(placement.plaste_count()) / Math.log(2); i++)
                        if (sub_row_size > sub_col_size)
                            sub_row_size /= 2;
                        else
                            sub_col_size /= 2;
                    // 돈땡을 고려
                    if (placement.inverse_count() == 2)
                        if (sub_row_size > sub_col_size) {
                            sub_row_size /= 2;
                            inversed_direction = application.Direction.VERTICAL;
                        }
                        else {
                            sub_col_size /= 2;
                            inversed_direction = application.Direction.HORIZONTAL;
                        }
                    if (process.getDevice().isFolding() == true) {
                        //----
                        // 접지를 행하는 경우, Folding 객체가 페이지 배치를 계산함
                        //----
                        // 부분 접지를 행하고
                        var folder = this._Compute_folding(sub_row_size, sub_col_size);
                        // 우철이나 하철의 제본을 행할 경우, 페이지 번호를 역순으로 뒤집는다.
                        if (image.getBindingDirection() == application.Direction.RIGHT || image.getBindingDirection() == application.Direction.DOWN)
                            folder.reverse();
                        // 이를 부분 행렬로 이전한다.
                        sub_matrix = folder.toMatrix(side);
                    }
                    else {
                        //----
                        // 접지를 행하지 않는 경우, 행렬의 순서에 따라 페이지 번호가 기입됨
                        //----
                        sub_matrix = new folding_1.core.Matrix(sub_row_size, sub_col_size);
                        for (var r = 0; r < sub_row_size; r++)
                            for (var c = 0; c < sub_col_size; c++) {
                                var page = r * sub_col_size + c + 1;
                                // 양면 조판의 경우, 페이지 조정
                                if (process.computeSide() == application.Side.DOUBLE)
                                    if (side == application.Side.FRONT)
                                        page = 2 * page - 1; // 2n - 1
                                    else {
                                        // 양면에 뒷면의 경우, 열을 역순배치해야 함
                                        page = r * sub_col_size + (sub_col_size - c);
                                        page *= 2; // 그리고 페이지를 원소 번호의 두 배로
                                    }
                                sub_matrix.set(r, c, new folding_1.core.Page(page, 0));
                            }
                    }
                    // 돈땡이 행해진 경우, 뒷면도 접지하여 부분행렬에 이어붙여야 한다.
                    if (placement.inverse_count() == 2) {
                        if (side == application.Side.BACK)
                            return sub_matrix;
                        // 뒷면의 부분행렬
                        var inversed_matrix = this._Compute_page_matrix(placement, application.Side.BACK);
                        // 앞면의 부분행렬에 이어붙임
                        if (inversed_direction == application.Direction.VERTICAL)
                            (_b = sub_matrix.data()).push.apply(_b, inversed_matrix.data()); // 아래에 이어붙임
                        else
                            for (var i = 0; i < sub_matrix.row_size(); i++)
                                (_c = sub_matrix.data()[i]).push.apply(_c, inversed_matrix.data()[i]); // 우측에 이어붙임
                    }
                    //--------
                    // 전체 행렬 구성
                    //--------
                    var matrix = new folding_1.core.Matrix(row_size, col_size);
                    var matrix_col_size = col_size / sub_matrix.col_size();
                    // 부분 행렬을 전체 행렬에 삽입
                    for (var i = 0; i < placement.plaste_count(); i++) {
                        var r_first = Math.floor(i / matrix_col_size) * sub_matrix.row_size();
                        var c_first = (i % matrix_col_size) * sub_matrix.col_size();
                        var r_last = r_first + sub_matrix.row_size();
                        var c_last = c_first + sub_matrix.col_size();
                        for (var r = r_first; r < r_last; r++)
                            for (var c = c_first; c < c_last; c++)
                                matrix.set(r, c, sub_matrix.at(r - r_first, c - c_first));
                    }
                    if (placement.isRotated() == true) {
                        // 조판면이 회전된 경우, 각도를 조정해 줌 (좌회전)
                        for (var r = 0; r < matrix.row_size(); r++)
                            for (var c = 0; c < matrix.col_size(); c++)
                                matrix.at(r, c).rotate();
                        // 이미지가 회전 배치된 경우, 최종 출력을 위해 행렬을 다시 (좌)회전
                        matrix = matrix.rotate_left();
                    }
                    return matrix;
                    var _a, _b, _c;
                };
                /**
                 *
                 *
                 * @param rows 행의 크기
                 * @param cols 열의 크기
                 *
                 * @return 접지 엔티티.
                 */
                PlacementViewer.prototype._Compute_folding = function (rows, cols) {
                    var folding = new folding_1.core.Folder(rows, cols);
                    // 가로, 세로별로 접어야 할 횟수를 구하고
                    var vertical_folds = Math.floor(Math.log(rows) / Math.log(2));
                    var horizontal_folds = Math.floor(Math.log(cols) / Math.log(2));
                    // 접지 순서를 정한 뒤
                    var direction_list = new std.List();
                    while (vertical_folds != 0 || horizontal_folds != 0) {
                        if (direction_list.empty() == false && vertical_folds == horizontal_folds)
                            if (direction_list.back() == application.Direction.VERTICAL)
                                direction_list.push_back(application.Direction.HORIZONTAL);
                            else
                                direction_list.push_back(application.Direction.VERTICAL);
                        else if (vertical_folds > horizontal_folds)
                            direction_list.push_back(application.Direction.VERTICAL);
                        else
                            direction_list.push_back(application.Direction.HORIZONTAL);
                        // 남은 접지횟수 차감
                        if (direction_list.back() == application.Direction.VERTICAL)
                            vertical_folds--;
                        else
                            horizontal_folds--;
                    }
                    // 그 순서에 따라 접지를 행한다.
                    for (var it = direction_list.begin(); !it.equals(direction_list.end()); it = it.next())
                        folding.fold(it.value);
                    return folding;
                };
                /* ---------------------------------------------------------
                    RENDERERS
                --------------------------------------------------------- */
                /**
                 * React 렌더러 함수.
                 */
                PlacementViewer.prototype.render = function () {
                    var placement = this.props.placement;
                    var side = placement.getProcess().computeSide();
                    //--------
                    // 범례 및 주석
                    //--------
                    var divides = [];
                    if (placement.inverse_count() > 1)
                        divides.push(React.createElement("li", null, " \uB3C8\uB561 (2 \uBD84\uD560) "));
                    if (placement.plaste_count() > 1)
                        divides.push(React.createElement("li", null,
                            " \uD310\uAC78\uC774 ",
                            placement.plaste_count(),
                            " \uD68C "));
                    //--------
                    // 시작 ~ 끝 페이지 산정
                    //--------
                    // 기본값
                    var start_page = this.props.startPage;
                    var last_page = Math.min(start_page + placement.page_count() - 1, // 이미지 수 x 양단면 코드 - 1
                    placement.computeLastPage() // 현 조판면 고유의 마지막 페이지
                    );
                    // 양면이며,
                    if (placement.getProcess().computeSide() == application.Side.DOUBLE)
                        if (placement.getDependency() != null) {
                            // 현재 페이지가 종속 페이지를 거느리는 경우,
                            var dependency = placement.getDependency();
                            // 그리고 마지막 조판면을 보고자하는 경우에는 
                            //	(현 조판면의 마지막, 바로 그 다음 페이지가 종속 조판면의 첫 페이지에 해당)
                            if (placement.computeLastPage() + 1 == dependency.computeFirstPage())
                                last_page = dependency.computeLastPage(); // 마지막 페이지는 종속면을 따라간다
                        }
                        else if (placement.getDependent() != null) {
                            // 현재 조판면이 특정 조판면에 종속되는 나머지 조판면인 경우
                            start_page -= placement.getDependent().image_count(); // 시작 페이지 수를 차감해준다
                            last_page = placement.computeLastPage(); // 마지막 페이지도 조절
                        }
                    return React.createElement("div", { style: { paddingLeft: 50 } },
                        React.createElement("h2", null, " \uBC94\uB840 "),
                        React.createElement("ul", null,
                            React.createElement("li", { style: { color: "black" } }, " \uAC80\uC740\uC0C9: \uAD6C\uC544\uC774 \uC601\uC5ED "),
                            React.createElement("li", { style: { color: "red" } }, " \uBE68\uAC04\uC0C9: \uC6A9\uC9C0 "),
                            React.createElement("li", { style: { color: "orange" } }, " \uC8FC\uD669\uC0C9: \uC778\uC1C4 \uAC00\uB2A5\uC601\uC5ED "),
                            React.createElement("li", { style: { color: "green" } }, " \uCD08\uB85D\uC0C9: \uC811\uD788\uB294 \uC601\uC5ED "),
                            React.createElement("li", { style: { color: "skyblue" } }, " \uD558\uB298\uC0C9: \uC774\uBBF8\uC9C0 + \uC5EC\uBC31 (margin) "),
                            React.createElement("li", { style: { color: "blue" } }, " \uD30C\uB780\uC0C9: \uC774\uBBF8\uC9C0 ")),
                        React.createElement("h2", null, " \uC870\uD310 "),
                        React.createElement("h4", null,
                            " ",
                            application.library.StringUtil.substitute("범위: {1}p ~ {2}p", start_page, last_page),
                            " "),
                        divides.length != 0 ? React.createElement("h4", null, " \uBD84\uD560 \uD69F\uC218 ") : null,
                        divides,
                        this._Render_front_side(start_page, last_page),
                        this._Render_back_side(start_page, last_page));
                };
                PlacementViewer.prototype._Render_front_side = function (startPage, lastPage) {
                    //--------
                    // 조판면과 시작페이지를 결정함
                    //	- 양면의 경우에, 표기할 조판면이 반드시 this.props.placement와 일치한다는 보장이 없다.
                    //	- 나머지 조판면의 경우, 그 이전 조판면이 앞면인 경우가 존재함
                    //	- 이 때, this.props.startPage 또한 그대로 사용할 수 없음
                    //--------
                    var placement = this.props.placement;
                    if (placement.getProcess().computeSide() == application.Side.DOUBLE
                        && placement.getDependent() != null) {
                        // 양면 조판이며, 현 조판이 나머지 조판면에 해당하여,
                        // 앞면을 본 판면 (현 나머지 조판면이 종속되는 판면) 의 마지막 판면으로 대치
                        placement = placement.getDependent(); // 종속 조판면으로 대치
                    }
                    return React.createElement("div", null,
                        React.createElement("h3", null, " \uC55E\uBA74 "),
                        this._Render_placement(placement, application.Side.FRONT, startPage, lastPage));
                };
                PlacementViewer.prototype._Render_back_side = function (startPage, lastPage) {
                    var placement = this.props.placement;
                    var process = placement.getProcess();
                    // 단면에 접지를 하지 않는 경우나, 돈땡을 행한 경우에는 -> 뒷면이 없다.
                    if ((process.computeSide() == application.Side.SINGLE && process.getDevice().isFolding() == false)
                        || (process.computeSide() == application.Side.DOUBLE && placement.inverse_count() == 2)
                        || (process.computeSide() == application.Side.SINGLE && placement.image_count() == 1))
                        return null;
                    //--------
                    // 조판면과 시작페이지를 결정함
                    //	- 양면의 경우에, 표기할 조판면이 반드시 this.props.placement와 일치한다는 보장이 없다.
                    //	- 현 조판면에 대한 나머지 조판면의 경우, 그 나머지 조판면이 뒷면이 된다.
                    //	- 이 때, this.props.startPage 또한 그대로 사용할 수 없음
                    //--------
                    if (process.computeSide() == application.Side.DOUBLE && placement.getDependency() != null) {
                        // 양면 조판이며, 현재 페이지가 종속 페이지를 거느리는 경우,
                        var dependency = placement.getDependency();
                        // 그리고 마지막 조판면을 보고자하는 경우에는 
                        //	(현 조판면의 마지막, 바로 그 다음 페이지가 종속 조판면의 첫 페이지에 해당)
                        if (placement.computeLastPage() + 1 == dependency.computeFirstPage()) {
                            placement = dependency; // 뒷면을 종속면으로 대치해줌
                        }
                    }
                    return React.createElement("div", null,
                        React.createElement("h3", null, " \uB4B7\uBA74 "),
                        this._Render_placement(placement, application.Side.BACK, startPage, lastPage));
                };
                PlacementViewer.prototype._Render_placement = function (placement, side, startPage, lastPage) {
                    //--------
                    // 스택객체 리스트
                    //--------
                    // BASIC MEMBERS
                    var process = placement.getProcess();
                    var device = process.getDevice();
                    var paper_size = placement.getPaperSize();
                    // GRAPHICAL OBJECTS
                    var paper_rect;
                    var helpers = [];
                    var image_rects = [];
                    var page_texts = [];
                    // PAPER
                    paper_rect = React.createElement("rect", { width: paper_size.getWidth(), height: paper_size.getHeight(), style: { stroke: "red", strokeWidth: 1, fill: "none" } });
                    //--------
                    // HELPERS - 종이, 구와이 영역 및 X, Y 축선
                    //--------
                    // 구와이 영역
                    if (device.computeBitedWidth() != 0)
                        helpers.push(React.createElement("rect", { width: device.computeBitedWidth(), height: paper_size.getHeight(), style: { fill: "black", opacity: .5 } }));
                    else
                        helpers.push(React.createElement("rect", { width: paper_size.getWidth(), height: device.computeBitedHeight(), style: { fill: "black", opacity: .5 } }));
                    // PRINTABLE AREA
                    {
                        helpers.push(React.createElement("rect", { width: placement.computePrintableWidth(), height: placement.computePrintableHeight(), x: device.computeBitedWidth() + device.getNonPrintableWidth(), y: device.computeBitedHeight() + device.getNonPrintableHeight(), style: { fill: "none", stroke: "orange", strokeWidth: 1 } }));
                    }
                    // HORIZONTAL LINES - X AXIS
                    for (var row = 1; row < placement.row_size(); row++) {
                        var y = new folding_1.core.Wrap(placement, row, 0).computeSector().y;
                        helpers.push(React.createElement("line", { x1: device.computeBitedWidth() + device.getNonPrintableWidth(), y1: y, x2: paper_size.getWidth() - device.getNonPrintableWidth(), y2: y, style: { stroke: "green", strokeWidth: 1 } }));
                    }
                    // VERTICAL LINES - Y AXIS
                    for (var col = 1; col < placement.col_size(); col++) {
                        var x = new folding_1.core.Wrap(placement, 0, col).computeSector().x;
                        helpers.push(React.createElement("line", { x1: x, y1: device.computeBitedHeight() + device.getNonPrintableHeight(), x2: x, y2: paper_size.getHeight() - device.getNonPrintableHeight(), style: { stroke: "green", strokeWidth: 1 } }));
                    }
                    //--------
                    // 이미지 (페이지) 를 의미하는 사각형과 페이지 번호
                    //--------
                    var matrix = this._Compute_page_matrix(placement, side);
                    var i = 0;
                    for (var r = 0; r < placement.row_size(); r++)
                        for (var c = 0; c < placement.col_size(); c++) {
                            //--------
                            // 바운더리 박스를 표기함
                            //--------
                            // 배치 정보를 담은 Wrap 객체
                            var wrap = new folding_1.core.Wrap(placement, r, c);
                            // 배치 좌표 및 바운더리 정보
                            var image_point = wrap.computePoint();
                            var margin = wrap.computeMargin();
                            var boundary = wrap.computeSector();
                            //--------
                            // 페이지를 표기함
                            //--------
                            // 현재의 페이지와 배치 방향을 계산함
                            var page = void 0;
                            var rotation_symbol = void 0;
                            // 페이지 번호를 담은 부분행렬
                            var element = matrix.at(r, c);
                            if (process.computeSide() == application.Side.SINGLE && process.getDevice().isFolding() == true) {
                                // 단면 접지일 때는, 홀수의 원소번호만 취급한다.
                                if (element.getPage() % 2 == 0)
                                    continue;
                                else
                                    page = Math.ceil(element.getPage() / 2) + startPage - 1;
                            }
                            else
                                page = element.getPage() + startPage - 1;
                            // 산정된 페이지가 사용자 정의 최대 페이지를 벗어남
                            if (page > lastPage)
                                continue;
                            // 페이지의 배치 각도에 따른 기호 표기
                            switch (element.getAngle()) {
                                case -90:
                                    rotation_symbol = "◀";
                                    break;
                                case 0:
                                    rotation_symbol = "▲";
                                    break;
                                case 90:
                                    rotation_symbol = "▷";
                                    break;
                                case 180:
                                    rotation_symbol = "▽";
                                    break;
                            }
                            // 페이지 번호 (글자) 가 위치할 좌표
                            var page_x = boundary.x + boundary.width / 2;
                            var page_y = boundary.y + boundary.height / 2;
                            image_rects.push(React.createElement("rect", { width: placement.computeImageWidth(), height: placement.computeImageHeight(), x: image_point.x, y: image_point.y, style: { fill: "blue", opacity: .3 } }));
                            helpers.push(React.createElement("rect", { width: margin.width, height: margin.height, x: margin.x, y: margin.y, style: { fill: "none", stroke: "skyblue" } }));
                            page_texts.push(React.createElement("text", { fontSize: 25, x: page_x, y: page_y },
                                rotation_symbol,
                                " ",
                                page));
                        }
                    return React.createElement("svg", { width: paper_size.getWidth() + 10, height: paper_size.getHeight() + 10 },
                        paper_rect,
                        ",",
                        helpers,
                        ",",
                        image_rects,
                        page_texts);
                };
                return PlacementViewer;
            }(React.Component));
            application.PlacementViewer = PlacementViewer;
        })(application = folding_1.application || (folding_1.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
            /**
             * 가격모형 리스트 엔티티 편집기.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var PriceModelsEditor = (function (_super) {
                __extends(PriceModelsEditor, _super);
                function PriceModelsEditor() {
                    return _super.apply(this, arguments) || this;
                }
                /* ---------------------------------------------------------
                    RENDERER
                --------------------------------------------------------- */
                /**
                 * React 렌더러 함수.
                 */
                PriceModelsEditor.prototype.render = function () {
                    var price_models = this.props.priceModels;
                    var print = price_models.getPrint();
                    var foil = price_models.getFoil();
                    var scodix = price_models.getScodix();
                    var thomson = price_models.getThomson();
                    var laminating = price_models.getLaminating();
                    return React.createElement("div", null,
                        React.createElement("h2", null, " \uAC00\uACA9 \uBAA8\uD615 "),
                        React.createElement("h3", null, " \uC778\uC1C4 "),
                        React.createElement("ul", { id: "print_price_model_editor_ui", disabled: !print.isUsed() },
                            React.createElement("li", null,
                                " \uC791\uC5C5\uBE44 (\uACC4\uB2E8\uD615 \uACE0\uC815\uBE44):",
                                React.createElement("input", { type: "number", defaultValue: print.getWorkPrice() + "", onChange: this._Change_member_value_number.bind(this, print.setWorkPrice.bind(print)), style: { width: 70 } }),
                                " \uC6D0" + " " + "/",
                                React.createElement("input", { type: "number", defaultValue: print.getWorkFaces() + "", onChange: this._Change_member_value_number.bind(this, print.setWorkFaces.bind(print)), style: { width: 70 } }),
                                " \uBA74 X \uB3C4 (\uC0C9\uC0C1, CMYK: 4\uB3C4)"),
                            React.createElement("li", null,
                                " CTP \uCD9C\uB825\uBE44 (\uBCC0\uB3D9\uBE44): \uD310 X \uB3C4 X",
                                React.createElement("input", { type: "number", defaultValue: print.getCTPPrice() + "", onChange: this._Change_member_value_number.bind(this, print.setCTPPrice.bind(print)), style: { width: 70 } }),
                                " \uC6D0"),
                            React.createElement("li", null,
                                " \uC5EC\uBD84 \uC6A9\uC9C0",
                                React.createElement("input", { type: "number", defaultValue: print.getSparePapers() + "", onChange: this._Change_member_value_number.bind(this, print.setSparePapers.bind(print)), style: { width: 70 } }),
                                " \uB9E4 / \uD310"),
                            React.createElement("li", null,
                                " \uC591/\uB2E8\uBA74:",
                                React.createElement("select", { onChange: this._Change_print_side.bind(this) },
                                    React.createElement("option", { value: "1", selected: print.getSide() == 1 }, " \uB2E8\uBA74 "),
                                    React.createElement("option", { value: "2", selected: print.getSide() == 2 }, " \uC591\uBA74 "))),
                            React.createElement("li", null,
                                " \uC0C9\uC0C1 \uB3C4\uC218:",
                                React.createElement("ul", null,
                                    React.createElement("li", null,
                                        " \uC55E\uBA74:",
                                        React.createElement("input", { defaultValue: print.getFrontSideColorCode(), onChange: this._Change_member_value_string.bind(this, print.setFrontSideColorCode.bind(print)), style: { width: 70 } }),
                                        " \uB3C4"),
                                    React.createElement("li", { id: "print_price_model_side_editor_li", disabled: print.getSide() == 1 },
                                        " \uB4B7\uBA74:",
                                        React.createElement("input", { defaultValue: print.getBackSideColorCode(), onChange: this._Change_member_value_string.bind(this, print.setBackSideColorCode.bind(print)), style: { width: 70 } }),
                                        " \uB3C4")))),
                        React.createElement("h3", null,
                            " ",
                            React.createElement("input", { type: "checkbox", defaultChecked: foil.isUsed(), onChange: this._Change_model_enabled.bind(this, foil) }),
                            " \uBC15 "),
                        React.createElement("ul", { id: "foil_price_model_editor_ui", disabled: !foil.isUsed() },
                            React.createElement("li", null,
                                " \uB2E8\uC704\uB2F9 \uC791\uC5C5\uBE44 (\uBCC0\uB3D9\uBE44):",
                                React.createElement("input", { type: "number", defaultValue: foil.getWorkPrice() + "", onChange: this._Change_member_value_number.bind(this, foil.setWorkPrice.bind(foil)), style: { width: 70 } }),
                                " \uC6D0" + " " + "/",
                                React.createElement("input", { type: "number", defaultValue: foil.getWorkFaces() + "", onChange: this._Change_member_value_number.bind(this, foil.setWorkFaces.bind(foil)), style: { width: 70 } }),
                                " \uBA74"),
                            React.createElement("li", null,
                                " \uB3D9\uD310\uBE44 / \uD310 (\uB3C4\uC7A5):",
                                React.createElement("input", { type: "number", defaultValue: foil.getCopperPrice() + "", onChange: this._Change_member_value_number.bind(this, foil.setCopperPrice.bind(foil)), style: { width: 70 } }),
                                " \uC6D0 / cm\u00B2"),
                            React.createElement("li", null,
                                " \uBC15\uBE44 / \uD310 (\uC789\uD06C\uBE44):",
                                React.createElement("input", { type: "number", defaultValue: foil.getInkPrice() + "", onChange: this._Change_member_value_number.bind(this, foil.setInkPrice.bind(foil)), style: { width: 70 } }),
                                " \uC6D0 / m\u00B2"),
                            React.createElement("li", null,
                                " \uC789\uD06C \uBA74\uC801 (\uC784\uC2DC)",
                                React.createElement("input", { type: "number", defaultValue: foil.$getInkAreaPercentage() + "", onChange: this._Change_member_value_number.bind(this, foil.$setInkAreaPercentage.bind(foil)), style: { width: 70 } }),
                                " % / \uC885\uC774\uBA74\uC801"),
                            React.createElement("li", null,
                                " \uC5EC\uBD84 \uC6A9\uC9C0",
                                React.createElement("input", { type: "number", defaultValue: foil.getSparePapers() + "", onChange: this._Change_member_value_number.bind(this, foil.setSparePapers.bind(foil)), style: { width: 70 } }),
                                " \uB9E4 / \uD310"),
                            React.createElement("li", null,
                                " \uC591/\uB2E8\uBA74:",
                                React.createElement("select", { onChange: this._Change_member_value_number.bind(this, foil.setSide.bind(foil)) },
                                    React.createElement("option", { value: "1", selected: foil.getSide() == 1 }, " \uB2E8\uBA74 "),
                                    React.createElement("option", { value: "2", selected: foil.getSide() == 2 }, " \uC591\uBA74 ")))),
                        React.createElement("h3", null,
                            " ",
                            React.createElement("input", { type: "checkbox", defaultChecked: scodix.isUsed(), onChange: this._Change_model_enabled.bind(this, scodix) }),
                            " \uC2A4\uCF54\uB515\uC2A4 "),
                        React.createElement("ul", { id: "scodix_price_model_editor_ui", disabled: !scodix.isUsed() },
                            React.createElement("li", null,
                                " \uD53C\uB529\uBE44:",
                                React.createElement("input", { type: "number", defaultValue: scodix.getFeedingPrice() + "", onChange: this._Change_member_value_number.bind(this, scodix.setFeedingPrice.bind(scodix)), style: { width: 70 } }),
                                " \uC6D0 / \uD68C"),
                            React.createElement("li", null,
                                " \uD55C \uD310 \uC789\uD06C\uBE44:",
                                React.createElement("input", { type: "number", defaultValue: scodix.getInkPrice() + "", onChange: this._Change_member_value_number.bind(this, scodix.setInkPrice.bind(scodix)), style: { width: 70 } }),
                                " \uC6D0 / A3 1% \uBA74\uC801"),
                            React.createElement("li", null,
                                " \uC789\uD06C \uBA74\uC801 (\uC784\uC2DC)",
                                React.createElement("input", { type: "number", defaultValue: scodix.$getInkAreaPercentage() + "", onChange: this._Change_member_value_number.bind(this, scodix.$setInkAreaPercentage.bind(foil)), style: { width: 70 } }),
                                " % / \uC885\uC774\uBA74\uC801"),
                            React.createElement("li", null,
                                " \uC5EC\uBD84 \uC6A9\uC9C0",
                                React.createElement("input", { type: "number", defaultValue: scodix.getSparePapers() + "", onChange: this._Change_member_value_number.bind(this, scodix.setSparePapers.bind(scodix)), style: { width: 70 } }),
                                " \uB9E4 / \uD310"),
                            React.createElement("li", null,
                                " \uC591/\uB2E8\uBA74:",
                                React.createElement("select", { onChange: this._Change_member_value_number.bind(this, scodix.setSide.bind(scodix)) },
                                    React.createElement("option", { value: "1", selected: scodix.getSide() == 1 }, " \uB2E8\uBA74 "),
                                    React.createElement("option", { value: "2", selected: scodix.getSide() == 2 }, " \uC591\uBA74 ")))),
                        React.createElement("h3", null,
                            " ",
                            React.createElement("input", { type: "checkbox", defaultChecked: thomson.isUsed(), onChange: this._Change_model_enabled.bind(this, thomson) }),
                            " \uD1B0\uC2A8 "),
                        React.createElement("ul", { id: "thomson_price_model_editor_ui", disabled: !thomson.isUsed() },
                            React.createElement("li", null, " \uB2E8\uC704\uB2F9 \uC791\uC5C5\uBE44 "),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " \uACE0\uC815 \uBE44\uC6A9 (\uACC4\uB2E8\uD615 \uBCC0\uB3D9\uBE44):",
                                    React.createElement("input", { type: "number", defaultValue: thomson.getWorkUnitPrice() + "", onChange: this._Change_member_value_number.bind(this, thomson.setWorkUnitPrice.bind(thomson)), style: { width: 70 } }),
                                    " \uC6D0" + " " + "/",
                                    React.createElement("input", { type: "number", defaultValue: thomson.getWorkUnitFaces() + "", onChange: this._Change_member_value_number.bind(this, thomson.setWorkUnitFaces.bind(thomson)), style: { width: 70 } }),
                                    " \uB9E4"),
                                React.createElement("li", null,
                                    " \uCD94\uAC00 \uBE44\uC6A9 (\uBCC0\uB3D9\uBE44):",
                                    React.createElement("input", { type: "number", defaultValue: thomson.getWorkSurplusPrice() + "", onChange: this._Change_member_value_number.bind(this, thomson.setWorkSurplusPrice.bind(thomson)), style: { width: 70 } }),
                                    "\uC6D0 / \uB9E4"),
                                React.createElement("li", null,
                                    " \uC5EC\uBD84 \uC6A9\uC9C0",
                                    React.createElement("input", { type: "number", defaultValue: thomson.getSparePapers() + "", onChange: this._Change_member_value_number.bind(this, thomson.setSparePapers.bind(thomson)), style: { width: 70 } }),
                                    " \uB9E4 / \uD310")),
                            React.createElement("li", null,
                                " \uD55C \uD310 \uCE7C\uBE44 (\uB3C4\uC7A5):",
                                React.createElement("input", { type: "number", defaultValue: thomson.getCuttingPrice() + "", onChange: this._Change_member_value_number.bind(this, thomson.setCuttingPrice.bind(thomson)), style: { width: 70 } }),
                                " \uC6D0 / m"),
                            React.createElement("li", null,
                                " \uCE7C \uAE38\uC774 (\uC784\uC2DC):",
                                React.createElement("input", { type: "number", defaultValue: thomson.$getCuttingLength() + "", onChange: this._Change_member_value_number.bind(this, thomson.$setCuttingLength.bind(thomson)), style: { width: 70 } }),
                                " m / \uBD80 (\uAD8C)")),
                        React.createElement("h3", null,
                            " ",
                            React.createElement("input", { type: "checkbox", defaultChecked: laminating.isUsed(), onChange: this._Change_model_enabled.bind(this, laminating) }),
                            " \uB77C\uBBF8\uB124\uC774\uD305 "),
                        React.createElement("ul", { id: "laminating_price_model_editor_ui", disabled: !laminating.isUsed() },
                            React.createElement("li", null,
                                " \uC791\uC5C5\uBE44:",
                                React.createElement("input", { type: "number", defaultValue: laminating.getBasePrice() + "", onChange: this._Change_member_value_number.bind(this, laminating.setBasePrice.bind(laminating)), style: { width: 70 } }),
                                "\uC6D0" + " " + "/",
                                React.createElement("input", { type: "number", defaultValue: laminating.getBaseFaces() + "", onChange: this._Change_member_value_number.bind(this, laminating.setBaseFaces.bind(laminating)), style: { width: 70 } }),
                                "\uBA74"),
                            React.createElement("li", null,
                                " \uD544\uB984 \uAC00\uACA9:",
                                React.createElement("input", { type: "number", defaultValue: laminating.getInkPrice() + "", onChange: this._Change_member_value_number.bind(this, laminating.setInkPrice.bind(laminating)), style: { width: 70 } }),
                                "\uC6D0 / m\u00B2"),
                            React.createElement("li", null,
                                " \uC5EC\uBD84 \uC6A9\uC9C0",
                                React.createElement("input", { type: "number", defaultValue: laminating.getSparePapers() + "", onChange: this._Change_member_value_number.bind(this, laminating.setSparePapers.bind(laminating)), style: { width: 70 } }),
                                " \uB9E4 / \uD310"),
                            React.createElement("li", null,
                                " \uC591/\uB2E8\uBA74:",
                                React.createElement("select", { onChange: this._Change_member_value_number.bind(this, laminating.setSide.bind(laminating)) },
                                    React.createElement("option", { value: "1", selected: laminating.getSide() == 1 }, " \uB2E8\uBA74 "),
                                    React.createElement("option", { value: "2", selected: laminating.getSide() == 2 }, " \uC591\uBA74 ")))));
                };
                /* ---------------------------------------------------------
                    EVENT HANDLERS
                --------------------------------------------------------- */
                /**
                 * @hidden
                 */
                PriceModelsEditor.prototype._Change_member_value_number = function (setter, event) {
                    //--------
                    // 이벤트 리스터 who calls 타깃 엔티티의 멤버 setter 함수 with number.
                    // 
                    // @param setter number 세터 함수
                    // @param event Form 편집으로 인해 발생한 이벤트 객체
                    //--------
                    var value = Number(event.target.value);
                    setter(value);
                };
                /**
                 * @hidden
                 */
                PriceModelsEditor.prototype._Change_member_value_string = function (setter, event) {
                    //--------
                    // 이벤트 리스터 who calls 타깃 엔티티의 멤버 setter 함수 with string.
                    // 
                    // @param setter string 세터 함수
                    // @param event Form 편집으로 인해 발생한 이벤트 객체
                    //--------
                    var value = String(event.target.value);
                    setter(value);
                };
                /**
                 * @hidden
                 */
                PriceModelsEditor.prototype._Change_model_enabled = function (priceModel, event) {
                    //--------
                    // 가격모형 활성화 (CheckBox ChangeEvent) 핸들러.
                    //--------
                    priceModel.setUsed(event.target.checked);
                    var ul_element = null;
                    if (priceModel instanceof folding.core.PrintModel)
                        ul_element = document.getElementById("print_price_model_editor_ui");
                    else if (priceModel instanceof folding.core.FoilModel)
                        ul_element = document.getElementById("foil_price_model_editor_ui");
                    else if (priceModel instanceof folding.core.ScodixModel)
                        ul_element = document.getElementById("scodix_price_model_editor_ui");
                    else if (priceModel instanceof folding.core.ThomsonModel)
                        ul_element = document.getElementById("thomson_price_model_editor_ui");
                    else if (priceModel instanceof folding.core.LaminatingModel)
                        ul_element = document.getElementById("laminating_price_model_editor_ui");
                    if (ul_element != null)
                        ul_element.disabled = !event.target.checked;
                };
                /**
                 * @hidden
                 */
                PriceModelsEditor.prototype._Change_print_side = function (event) {
                    //--------
                    // 양단면 변경 (ComboBox ChangeEvent) 핸들러.
                    //--------
                    var val = Number(event.target.value);
                    this.props.priceModels.getPrint().setSide(val);
                    document.getElementById("print_price_model_side_editor_li").disabled = (val == 1);
                };
                return PriceModelsEditor;
            }(React.Component));
            application.PriceModelsEditor = PriceModelsEditor;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
            /**
             * 공정 리스트 에디터.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var ProcessArrayEditor = (function (_super) {
                __extends(ProcessArrayEditor, _super);
                function ProcessArrayEditor() {
                    var _this = _super.apply(this, arguments) || this;
                    /**
                     * 선택된 공정 번호.
                     */
                    _this.selected_index_ = 0;
                    return _this;
                }
                Object.defineProperty(ProcessArrayEditor.prototype, "selected_process_", {
                    /**
                     * 선택된 공정 getter.
                     */
                    get: function () {
                        try {
                            return this.props.processArray.at(this.selected_index_);
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
                /**
                 * React 렌더링 함수.
                 */
                ProcessArrayEditor.prototype.render = function () {
                    // ADD_EVENT_LISTENER
                    this.props.processArray.addEventListener("insert", this._Handle_collection_event, this);
                    this.props.processArray.addEventListener("erase", this._Handle_collection_event, this);
                    this.props.processArray.addEventListener("refresh", this._Handle_collection_event, this);
                    // CONSTRUCT COLUMNS
                    var columns = [
                        { key: "$name", name: "공정명", width: 400, editable: true }
                    ];
                    return React.createElement("div", null,
                        React.createElement("h1", null, " \uACF5\uC815 \uB9AC\uC2A4\uD2B8 "),
                        React.createElement(ReactDataGrid, { rowGetter: this._Fetch_row.bind(this), rowsCount: this.props.processArray.size(), columns: columns, onCellSelected: this._Handle_select.bind(this), onRowUpdated: this._Handle_updated.bind(this), enableCellSelect: true, minHeight: 40 + 35 * this.props.processArray.size() }),
                        React.createElement("p", { style: { textAlign: "right" } },
                            React.createElement("button", { onClick: this._Insert_process.bind(this) }, " \uCD94\uAC00 "),
                            React.createElement("button", { onClick: this._Erase_process.bind(this) }, " \uC0AD\uC81C ")),
                        React.createElement("hr", null),
                        React.createElement("h1", null,
                            " \uACF5\uC815 \uD3B8\uC9D1\uAE30: ",
                            this.selected_process_ == null ? "" : this.selected_process_.$name,
                            " "),
                        React.createElement("div", { id: "process_editor_div" },
                            React.createElement(application.ProcessEditor, { process: this.selected_process_ })));
                };
                /**
                 * 공정 리스트 그리드를 갱신.
                 */
                ProcessArrayEditor.prototype._Refresh = function () {
                    this.setState({});
                };
                /**
                 * 선택된 공정 (에디터) 을 갱신.
                 */
                ProcessArrayEditor.prototype._Refresh_process = function () {
                    this._Refresh();
                    var div = document.getElementById("process_editor_div");
                    if (div.children.length != 0)
                        div.removeChild(div.children[0]);
                    ReactDOM.render(React.createElement(application.ProcessEditor, { process: this.selected_process_ }), div);
                };
                /* =========================================================
                    EVENT HANDLERS
                        - GRID
                        - ELEMENTS I/O
                ============================================================
                    GRID EVENTS
                --------------------------------------------------------- */
                /**
                 * DataProvider for 공정 리스트 그리드.
                 */
                ProcessArrayEditor.prototype._Fetch_row = function (index) {
                    return this.props.processArray.at(index);
                };
                /**
                 * 공정 선택 이벤트, from 공정 리스트 그리드, 핸들러
                 */
                ProcessArrayEditor.prototype._Handle_select = function (event) {
                    try {
                        this.selected_index_ = event.rowIdx;
                        this._Refresh_process();
                    }
                    catch (exception) { }
                };
                /**
                 * 공정 멤버 데이터 편집 이벤트, from 공정 리스트 그리드, 핸들러
                 */
                ProcessArrayEditor.prototype._Handle_updated = function (event) {
                    Object.assign(this.selected_process_, event.updated);
                    this.props.processArray.refresh(this.props.processArray.begin().advance(this.selected_index_));
                };
                /* ---------------------------------------------------------
                    ELEMENTS I/O
                --------------------------------------------------------- */
                /**
                 * <p> 공정 리스트 엔티티에서 발생한 CollectionEvent 핸들러. 다음과 같은 상황에서 발생하는 이벤트를 다룸 </p>
                 *
                 * <ul>
                 *	<li> 삽입 </li>
                 *	<li> 삭제 </ii>
                 *	<li> 갱신 (편집) </li>
                 * </ul>
                 *
                 * @param event 컬렉션 이벤트 객체.
                 */
                ProcessArrayEditor.prototype._Handle_collection_event = function (event) {
                    this._Refresh();
                };
                /**
                 * 공정 삽입버튼 클릭.
                 */
                ProcessArrayEditor.prototype._Insert_process = function (event) {
                    this.props.processArray.push_back(new folding.core.Process(this.props.processArray));
                };
                /**
                 * 공정 삭제버튼 클릭.
                 */
                ProcessArrayEditor.prototype._Erase_process = function (event) {
                    try {
                        this.props.processArray.erase(this.props.processArray.begin().advance(this.selected_index_));
                        if (this.selected_index_ >= this.props.processArray.size())
                            this.selected_index_ = -1;
                        this._Refresh_process();
                    }
                    catch (exception) { }
                };
                return ProcessArrayEditor;
            }(React.Component));
            application.ProcessArrayEditor = ProcessArrayEditor;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
            /**
             * 공정 리스트 뷰어
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var ProcessArrayViewer = (function (_super) {
                __extends(ProcessArrayViewer, _super);
                function ProcessArrayViewer() {
                    var _this = _super.apply(this, arguments) || this;
                    /**
                     * 선택된 공정 번호.
                     */
                    _this.selected_index_ = 0;
                    return _this;
                }
                Object.defineProperty(ProcessArrayViewer.prototype, "selected_process_", {
                    /**
                     * 선택된 공정 getter.
                     */
                    get: function () {
                        try {
                            return this.props.processArray.at(this.selected_index_);
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
                /**
                 * React 렌더러 함수.
                 */
                ProcessArrayViewer.prototype.render = function () {
                    var columns = [
                        { key: "$name", name: "공정명", width: 150 },
                        { key: "$page", name: "페이지", width: 70 },
                        { key: "$copies", name: "사본", width: 70 },
                        { key: "$price", name: "가격", width: 150 }
                    ];
                    return React.createElement("div", null,
                        React.createElement("h1", null, " \uACF5\uC815 \uB9AC\uC2A4\uD2B8 "),
                        React.createElement(ReactDataGrid, { rowGetter: this._Fetch_row.bind(this), rowsCount: this.props.processArray.size(), columns: columns, onCellSelected: this._Handle_select.bind(this), enableCellSelect: true, minHeight: 40 + 35 * this.props.processArray.size() }),
                        React.createElement("p", { style: { textAlign: "right" } },
                            "\uCD1D\uC561: ",
                            application.library.StringUtil.numberFormat(this.props.processArray.computePrice(), 0),
                            " \uC6D0"),
                        React.createElement("hr", null),
                        React.createElement("h1", null,
                            " \uACF5\uC815 \uC0C1\uC138\uACAC\uC801: ",
                            this.selected_process_ == null ? "" : this.selected_process_.$name,
                            " "),
                        React.createElement("div", { id: "process_viewer_div" },
                            React.createElement(application.ProcessViewer, { process: this.selected_process_ })));
                };
                /**
                 * 화면 갱신.
                 */
                ProcessArrayViewer.prototype._Refresh = function () {
                    this.setState({});
                };
                /* ---------------------------------------------------------
                    EVENT HANDLERS
                --------------------------------------------------------- */
                /**
                 * DataProvider for 공정리스트 그리드
                 */
                ProcessArrayViewer.prototype._Fetch_row = function (index) {
                    return this.props.processArray.at(index);
                };
                /**
                 * 공정을 선택했을 때 발생하는 그리드 셀렉션 이벤트 핸들러.
                 */
                ProcessArrayViewer.prototype._Handle_select = function (event) {
                    try {
                        this.selected_index_ = event.rowIdx;
                        this._Refresh();
                    }
                    catch (exception) { }
                };
                return ProcessArrayViewer;
            }(React.Component));
            application.ProcessArrayViewer = ProcessArrayViewer;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
            /**
             * 공정 편집기.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var ProcessEditor = (function (_super) {
                __extends(ProcessEditor, _super);
                function ProcessEditor() {
                    return _super.apply(this, arguments) || this;
                }
                /**
                 * React 렌더러 함수.
                 */
                ProcessEditor.prototype.render = function () {
                    if (this.props.process == null)
                        return React.createElement("p", null, " \uC544\uBB34 \uACF5\uC815\uB3C4 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. ");
                    // 아이템 편집기 | 가격모형 편집기
                    // -------------|---------------
                    return React.createElement("div", null,
                        React.createElement(flex.TabNavigator, { style: { width: 525, height: "100%", float: "left" } },
                            React.createElement(flex.NavigatorContent, { label: "Item Editor" },
                                React.createElement(application.ItemEditor, { process: this.props.process, paperArray: this.props.process.getProcessArray().getPaperArray(), cutter: this.props.process.getProcessArray().getCutter() })),
                            React.createElement(flex.NavigatorContent, { label: "Price Model" },
                                React.createElement(application.PriceModelsEditor, { priceModels: this.props.process.getPriceModels() }))));
                };
                return ProcessEditor;
            }(React.Component));
            application.ProcessEditor = ProcessEditor;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var application;
        (function (application) {
            /**
             * 결과화면 뷰어.
             *
             * 접지 최적화 연산 결과를 화면에 도표와 그리드로 보여주는 Movie 이다.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var ProcessViewer = (function (_super) {
                __extends(ProcessViewer, _super);
                function ProcessViewer() {
                    return _super.apply(this, arguments) || this;
                }
                /* ---------------------------------------------------------
                    RENDERERS
                --------------------------------------------------------- */
                /**
                 * React 렌더링 함수.
                 */
                ProcessViewer.prototype.render = function () {
                    if (this.props.process == null)
                        return React.createElement("p", null, " \uC544\uBB34 \uACF5\uC815\uB3C4 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. ");
                    var columns = [
                        { key: "$width", name: "가로", width: 70 },
                        { key: "$height", name: "세로", width: 70 },
                        { key: "$image_count", name: "이미지", width: 90 },
                        { key: "$paper_count", name: "용지", width: 90 },
                        { key: "$copies", name: "사본", width: 110 },
                        { key: "$rotated", name: "회전여부", width: 50 }
                    ];
                    if (this.props.process.empty() == false)
                        this._Handle_select({ rowIdx: 0, row: this.props.process.front() });
                    return React.createElement("div", null,
                        React.createElement("h2", null, " \uBC30\uCE58 \uC815\uBCF4 "),
                        React.createElement(ReactDataGrid, { rowGetter: this._Fetch_row.bind(this), rowsCount: this.props.process.size(), columns: columns, onCellSelected: this._Handle_select.bind(this), enableCellSelect: true, minHeight: 40 + 35 * this.props.process.size() }),
                        React.createElement("p", { style: { textAlign: "right" } },
                            "\uD604\uC7AC \uD398\uC774\uC9C0: ",
                            React.createElement("input", { id: "process_viewer_page_input", type: "number", onChange: this._Handle_page_change.bind(this), defaultValue: "1", min: 1, max: this.props.process.getImage().getPages() }),
                            " \uD398\uC774\uC9C0"),
                        React.createElement("hr", null),
                        React.createElement("h2", null, " \uC0C1\uC138 \uACAC\uC801 "),
                        this._Render_price_table());
                };
                /**
                 * 상세견적 테이블 렌더링.
                 */
                ProcessViewer.prototype._Render_price_table = function () {
                    var process = this.props.process;
                    var rows = process.getPriceModels().toGridRows(process);
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
                        var tr = React.createElement("tr", { className: class_name },
                            React.createElement("td", { className: "border" }, application.library.StringUtil.replaceAll(rows[i].name, "\t", "\u00a0\u00a0\u00a0\u00a0")),
                            React.createElement("td", { className: "border" },
                                " ",
                                rows[i].comment,
                                " "),
                            React.createElement("td", { className: "border", style: { textAlign: "right" } }, rows[i].sub_price !== undefined
                                ? application.library.StringUtil.numberFormat(rows[i].sub_price) + " 원"
                                : ""),
                            React.createElement("td", { className: "border", style: { textAlign: "right" } }, rows[i].price !== undefined
                                ? application.library.StringUtil.numberFormat(rows[i].price, 0) + " 원"
                                : ""));
                        tr_elements.push(tr);
                    }
                    var ret = React.createElement("table", { width: "530", style: { fontSize: 11, borderCollapse: "collapse" } },
                        React.createElement("tr", { className: "title_row" },
                            React.createElement("th", null, " \uD56D\uBAA9 "),
                            React.createElement("th", null, " \uC8FC\uC11D "),
                            React.createElement("th", { colSpan: 2 }, " \uAC00\uACA9 ")),
                        tr_elements);
                    return ret;
                };
                /* ---------------------------------------------------------
                    EVENT HANDLERS
                --------------------------------------------------------- */
                /**
                 * DataProvider for 배치 리스트 (a 공정) 그리드.
                 */
                ProcessViewer.prototype._Fetch_row = function (index) {
                    return this.props.process.at(index);
                };
                /**
                 * 배치 선택 이벤트, from 배치 리스트 그리드, 핸들러
                 */
                ProcessViewer.prototype._Handle_select = function (event) {
                    try {
                        // 타깃 조판면과, 해당 조판면의 첫 페이지
                        var placement = this.props.process.at(event.rowIdx);
                        var first_page = placement.computeFirstPage();
                        // 페이지 TextInput 에도 첫 페이지를 띄워줌
                        var page_input = document.getElementById("process_viewer_page_input");
                        if (page_input != null)
                            page_input.value = String(first_page);
                        ReactDOM.render(React.createElement(application.PlacementViewer, { placement: placement, startPage: first_page }), document.getElementById("placement_div"));
                    }
                    catch (exception) { }
                };
                /**
                 * 사용자의 페이지 변경 이벤트 핸들러.
                 *
                 * @param event Form Change Event
                 */
                ProcessViewer.prototype._Handle_page_change = function (event) {
                    var page = Number(event.target.value);
                    var process = this.props.process;
                    // 사용자가 입력한 페이지로부터 해당되는 조판면의 첫 페이지 산출
                    for (var i = 0; i < process.size(); i++) {
                        var placement = process.at(i);
                        var first_page = placement.computeFirstPage();
                        var last_page = placement.computeLastPage();
                        if (first_page <= page && page <= last_page) {
                            var my_unit = Math.floor((page - first_page) / placement.page_count());
                            var my_first_page = first_page + my_unit * placement.page_count();
                            ReactDOM.render(React.createElement(application.PlacementViewer, { placement: placement, startPage: my_first_page }), document.getElementById("placement_div"));
                            break;
                        }
                    }
                };
                return ProcessViewer;
            }(React.Component));
            application.ProcessViewer = ProcessViewer;
        })(application = folding.application || (folding.application = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * <p> 재단기 엔티티. </p>
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var Cutter = (function (_super) {
                __extends(Cutter, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                function Cutter() {
                    var _this = _super.call(this) || this;
                    _this.init();
                    return _this;
                }
                /**
                 * @inheritdoc
                 */
                Cutter.prototype.init = function () {
                    this.workPrice = 400;
                    this.workSheets = 300;
                    this.cutPrice = 100;
                };
                /* =========================================================
                    ACCESSORS
                        - MEMBERS
                        - COMPUTATIONS
                        - EXPORTERS
                ============================================================
                    MEMBERS
                --------------------------------------------------------- */
                Cutter.prototype.getWorkingPrice = function () {
                    return this.workPrice;
                };
                Cutter.prototype.getWorkingSheets = function () {
                    return this.workSheets;
                };
                Cutter.prototype.getCuttingPrice = function () {
                    return this.cutPrice;
                };
                Cutter.prototype.setWorkingPrice = function (val) {
                    this.workPrice = val;
                };
                Cutter.prototype.setWorkingSheets = function (val) {
                    this.workSheets = val;
                };
                Cutter.prototype.setCuttingPrice = function (val) {
                    this.cutPrice = val;
                };
                /* ---------------------------------------------------------
                    COMPUTATIONS
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                Cutter.prototype.computePrice = function (process) {
                    return this._Compute_work_price(process) + this._Compute_cutting_price(process);
                };
                Cutter.prototype._Compute_work_price = function (process) {
                    // 사용된 용지크기 및 장수에 대한 해쉬맵
                    var units = this._Compute_units(process);
                    // 작업가격 총합
                    var price = 0;
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
                        var volume = it.second;
                        var unit = Math.ceil(volume / this.workSheets);
                        price += unit * this.workPrice;
                    }
                    return price;
                };
                Cutter.prototype._Compute_cutting_price = function (process) {
                    // 사용된 용지크기 및 장수에 대한 해쉬맵
                    var units = this._Compute_units(process);
                    // 작업가격 총합
                    var price = 0;
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
                        var paper_size = it.first;
                        var volume = it.second;
                        var unit = Math.ceil(volume / this.workSheets);
                        var placement = new core.Placement(process, paper_size); // 배치모형
                        var cut = void 0; // 절단 횟수
                        if (process.getDevice().isFolding() == false || placement.max_image_count() == 1)
                            cut = 4;
                        else
                            cut = 3;
                        //// 최대 배치가능 이미지 수에 따라, 절단 횟수가 달리진다.
                        //switch (placement.max_image_count())
                        //{
                        //	case 8:
                        //		cut = 16; // 분할 4회, 테두리 4회, 여백 4회
                        //		break;
                        //	case 4:
                        //		cut = 8; // 분할 2회, 테두리 4회, 여백 2회
                        //		break;
                        //	case 2:
                        //		cut = 5; // 분할 1회, 테두리 4회, 여백 없음
                        //		break;
                        //	case 1:
                        //		cut = 4; // 테두리 4회
                        //		break;
                        //}
                        //// 대안 탐색, 나머지를 다른 조판에 옮길 수 있는가 (8 -> 4 || 4 -> 2)
                        //if (placement.max_image_count() >= 4 && !it.next().equals(units.end()))
                        //{
                        //	let next_paper_size: PaperSize = it.next().first; // 다음 용지크기
                        //	let next_volume: number = it.next().second; // 다음 용지크기의 장수
                        //	let next_placement: Placement = new Placement(process, next_paper_size);
                        //	if (placement.max_image_count() == 2 * next_placement.max_image_count()
                        //		&& next_volume % this.workSheets != 0
                        //		&& 2 * volume % this.workSheets + next_volume % this.workSheets < this.workSheets)
                        //	{
                        //		// 다음 용지크기는 현재 용지크기의 절반이며,
                        //		// 다음 용지크기 역시 나머지 수량이 존재하고,
                        //		// 현재 용지크기와 다음 용지크기의 나머지를 합쳐도 1단위를 넘지 않아야 한다
                        //		//	- 단, 이 때 현재 용지크기의 나머지에는 2를 곱해줘야 함
                        //		let my_price: number = (unit - 1) * (cut * this.cutPrice); // 단위 하나를 빼고 절단
                        //		my_price += this.cutPrice; // 그 후, 나머지 용지크기에 대하여 1회 절단만 수행
                        //		// 조정된 가격을 합산해주고
                        //		price += my_price;
                        //		// 다음 용지크기에 현재 나머지 수량의 2배를 더해준다
                        //		it.next().second += (volume % this.workSheets) * 2;
                        //		continue;
                        //	}
                        //}
                        price += unit * (cut * this.cutPrice); // 단위수 x (절단 횟수 x 1회 절단가격)
                    }
                    return price;
                };
                /**
                 * <p> 각 용지사이즈 별로 사용된 장수를 계산한다. </p>
                 *
                 * <p> 개별 공정 {@link Process} 내에 들은 조판면 정보 {@link Placement} 객체들은, 각기 사용한 용지
                 * {@link PaperSize}의 장수가 아닌, 면수 (@link Placement.face_count) 를 기록하고 있다. 이 함수
                 * {@link compute_units compute_units()} 에서는, 각 용지크기 ({@link PaperSize}) 별로 사용된 장수를,
                 * 양단면 인쇄를 고려하여 계산하여 해쉬맵의 형태로 리턴한다. </p>
                 *
                 * @param process 개별 공정 엔티티.
                 * @return 각 용지사이즈 및 사용된 장수에 대한 해쉬맵.
                 */
                Cutter.prototype._Compute_units = function (process) {
                    var units = process.getPaper().computeUnits(process);
                    var ret = new std.TreeMap(units.begin(), units.end(), // units, 기존의 HashMap 을 복제하되
                    std.greater // 용지가 큰 순서대로 정렬한다 (용지크기 내림차순)
                    );
                    return ret;
                };
                /* ---------------------------------------------------------
                    EXPORTERS
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                Cutter.prototype.TAG = function () {
                    return "cutter";
                };
                /**
                 * @inheritdoc
                 */
                Cutter.prototype.toGridRows = function (process) {
                    var rows = [
                        {
                            name: "재단",
                            price: this.computePrice(process),
                            comment: "재단비 = 작업비 + 절단비"
                        },
                        {
                            name: "\t작업비",
                            sub_price: this._Compute_work_price(process),
                            comment: core.library.StringUtil.substitute("{1} 장마다 {2} 원", core.library.StringUtil.numberFormat(this.workSheets), core.library.StringUtil.numberFormat(this.workPrice))
                        },
                        {
                            name: "\t절단비",
                            sub_price: this._Compute_cutting_price(process),
                            comment: core.library.StringUtil.numberFormat(this.cutPrice) + " 원 / 회"
                        }
                    ].concat(this._ToGridRows_cutting(process));
                    return rows;
                };
                Cutter.prototype._ToGridRows_cutting = function (process) {
                    var units = this._Compute_units(process);
                    var rows = [];
                    var i = 0;
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
                        var paper_size = it.first;
                        var volume = it.second;
                        var unit = Math.ceil(volume / this.workSheets);
                        var placement = new core.Placement(process, paper_size); // 배치모형
                        var cut = void 0; // 절단 횟수
                        // 최대 배치가능 이미지 수에 따라, 절단 횟수가 달리진다.
                        if (process.getDevice().isFolding() == false || placement.max_image_count() == 1)
                            cut = 4;
                        else
                            cut = 3;
                        var row = {
                            name: core.library.StringUtil.substitute("\t\t{1}. {2} x {3}", ++i, core.library.StringUtil.numberFormat(paper_size.getWidth()), core.library.StringUtil.numberFormat(paper_size.getHeight())),
                            comment: core.library.StringUtil.substitute("본지 총 {1} 장 -> {2} 단위 x {3} 회 = 총 {4} 회 절단", core.library.StringUtil.numberFormat(volume), core.library.StringUtil.numberFormat(unit), core.library.StringUtil.numberFormat(cut), core.library.StringUtil.numberFormat(unit * cut))
                        };
                        rows.push(row);
                    }
                    return rows;
                };
                return Cutter;
            }(core.protocol.Entity));
            core.Cutter = Cutter;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                        args[_i] = arguments[_i];
                    }
                    var _this = _super.call(this) || this;
                    if (args.length == 5) {
                        _this.biteLength = args[0];
                        _this.biteDirection = args[1];
                        _this.nonPrintableWidth = args[2];
                        _this.nonPrintableHeight = args[3];
                        _this.fold = args[4];
                    }
                    else
                        _this.init();
                    return _this;
                }
                /**
                 * 멤버변수 일괄 초기화.
                 */
                Device.prototype.init = function () {
                    this.biteLength = 3;
                    this.biteDirection = core.Direction.HORIZONTAL;
                    this.nonPrintableWidth = 2;
                    this.nonPrintableHeight = 5;
                    this.fold = core.Initial.FOLD;
                };
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                // COMPUTATIONS
                /**
                 * 구와이 가로 길이를 계산.
                 */
                Device.prototype.computeBitedWidth = function () {
                    return this.biteDirection == core.Direction.HORIZONTAL ? 0 : this.biteLength;
                };
                /**
                 * 구와이 세로 길이를 계산.
                 */
                Device.prototype.computeBitedHeight = function () {
                    return this.biteDirection == core.Direction.HORIZONTAL ? this.biteLength : 0;
                };
                // GETTERS
                Device.prototype.getBiteLength = function () { return this.biteLength; };
                Device.prototype.getBiteDirection = function () { return this.biteDirection; };
                Device.prototype.getNonPrintableWidth = function () { return this.nonPrintableWidth; };
                Device.prototype.getNonPrintableHeight = function () { return this.nonPrintableHeight; };
                Device.prototype.isFolding = function () { return this.fold; };
                // SETTERS
                Device.prototype.setBiteLength = function (val) { this.biteLength = val; };
                Device.prototype.setBiteDirection = function (val) { this.biteDirection = val; };
                Device.prototype.setNonPrintableWidth = function (val) { this.nonPrintableWidth = val; };
                Device.prototype.setNonPrintableHeight = function (val) { this.nonPrintableHeight = val; };
                Device.prototype.setFolding = function (val) { this.fold = val; };
                /* ---------------------------------------------------------
                    EXPORTERS
                --------------------------------------------------------- */
                Device.prototype.TAG = function () {
                    return "device";
                };
                return Device;
            }(core.protocol.Entity));
            core.Device = Device;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * 접지 클래스.
             *
             * {@link Folder} 는 접지를 행하고, 접지를 행한 후 표기되는 페이지에 대한 행렬을 만들어주는 클래스이다.
             *
             * 접지를 하려거든 접으려는 방향과 함께 {@link fold fold()} 함수를 호출하면 된다. 접지를 모두 행한 후엔
             * {@link toMatrix toMatrix()} 함수를 호출하거든, 각 페이지의 배치 정보를 행렬로 받아볼 수 있다.
             *
             * 이 {@link Folder} 의 활용 예제는 {@link PlacementViewer} 가 가장 대표적이다.
             * - {@link PlacementViewer._Compute_page_matrix}
             * - {@link PlacementViewer._Compute_folding}
             *
             * @see {@link PlacementViewer}
             * @author Jeongho Nam <http://samchon.org>
             */
            var Folder = (function () {
                /* =========================================================
                    CONSTRUCTORS
                        - BASIC CONSTRUCTORS
                        - OPTIMIZER
                ============================================================
                    BASIC CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Construct from matrix size.
                 *
                 * @param rows 행 크기
                 * @param cols 열 크기
                 */
                function Folder(rows, cols) {
                    // BASIC MEMBERS
                    this.row_size_ = rows;
                    this.col_size_ = cols;
                    this.element_array_ = new std.Vector();
                    this.history_ = new std.List();
                    for (var side = core.Side.FRONT; side <= core.Side.BACK; side++)
                        for (var r = 0; r < rows; r++)
                            for (var c = 0; c < cols; c++)
                                this.element_array_.push_back(new core.FolderElement(side, r, c));
                    // HIDDEN MEMBERS FOR COMPUTATION
                    this.$folded_row_size_ = rows;
                    this.$folded_col_size_ = cols;
                }
                /* ---------------------------------------------------------
                    OPTIMIZER
                --------------------------------------------------------- */
                /**
                 * 접지를 행함.
                 *
                 * 접지를 통해 각 행렬의 페이지와 번호와 회전 각도를 산정하는 알고리즘은 다음과 같다.
                 *
                 * 0. 각 구간은 {@link FolderElement} 라는 객체로 대표된다.
                 * 1. 접지를 행하기 전, 용지에는 앞-뒷면 만이 존재하는데, 앞면은 1페이지, 뒷면은 2페이지로 시작한다.
                 * 2. 종이를 접었을 때, 접히어 뒤집히는 면은 앞뒷면 코드가 바뀌며, 페이지 번호가 역순으로 재배치 된다.
                 *	- 접기 전의 현재 구간이 1 페이지에, 기존에 총 4 페이지가 있었다면,
                 *		- 접은 후의 새 페이지는 4 페이지가 된다.
                 * 3. 종이를 접었을 때, 접히지 않는 면은, 앞뒷면 코드는 유지되나, 페이지 번호는 증가한다.
                 *	- 이전의 총 페이지 수를 더함
                 *	- 접기 전의 현재 구간이 2페이지에, 기존에 총 4 페이지가 있었다면
                 *		- 새 페이지는 6 (2 + 4 = 6)
                 * 4. 종이를 접을 때마다, 각 구간의 행렬의 번호를 변경한다.
                 *	- 가로로 접을 때,
                 *		- 앞면:
                 *			- 접히는 쪽이, 뒤집히어 뒷면이 됨.
                 *			- 접히지 않는 쪽은, 열 번호가 줄어든다.
                 *		- 뒷면:
                 *			- 접히는 쪽은, 뒤집히어 앞면이 되며, 열 번호가 줄어든다.
                 *			- 접히지 않는 쪽은, 아무런 변화가 없다.
                 *	- 세로로 접을 때,
                 *		- 앞-뒷면에 관계없이,
                 *		- 접히는 쪽은, 180도 뒤집히어 뒷면이 되며, 행-열 번호 모두가 뒤집힌다.
                 *		- 접히지 않는 쪽은, 행 번호가 줄어든다.
                 *
                 * @param direction 접는 방향.
                 */
                Folder.prototype.fold = function (direction) {
                    var index = (direction == core.Direction.VERTICAL)
                        ? this.$folded_row_size_ / 2
                        : this.$folded_col_size_ / 2;
                    // 우선, 현재의 접지행위를 접지 내역에 추가
                    this.history_.push_back(direction);
                    // 접히어 뒤집혀질 원소들과, 그렇지 않을 원소들
                    var folded_elements = new std.Vector();
                    var bottom_elements = new std.Vector();
                    if (direction == core.Direction.HORIZONTAL) {
                        //========
                        // 가로로 접음
                        //========
                        // 전체 열 크기가 반으로 줄음
                        this.$folded_col_size_ /= 2;
                        // 앞면을 기준으로, 왼쪽으로 오른쪽으로 접음
                        for (var i = 0; i < this.element_array_.size(); i++) {
                            var element = this.element_array_.at(i);
                            if (element.side == core.Side.FRONT) {
                                // 앞면
                                if (element.col < index) {
                                    //--------
                                    // 왼쪽에서 오른쪽으로 접는다
                                    //	- 뒤집히어 뒷면이 되나,
                                    //	- 열 번호는 유지된다 (앞뒷면은 서로 좌우대칭임).
                                    //--------
                                    folded_elements.push_back(element);
                                    element.side = core.Side.BACK; // 뒷면으로
                                }
                                else {
                                    // 아래쪽에 머무르며, 열 번호를 땡김
                                    bottom_elements.push_back(element);
                                    element.col -= this.$folded_col_size_;
                                }
                            }
                            else {
                                // 뒷면
                                if (element.col >= index) {
                                    //--------
                                    // 오른쪽에서 왼쪽으로 접혀들어간다
                                    //	- 뒤집히어 앞면이 되며,
                                    //	- 열 번호는 땡겨진다 (앞뒷면은 서로 좌우대칭임).
                                    //--------
                                    folded_elements.push_back(element);
                                    element.side = core.Side.FRONT; // 앞면으로
                                    element.col -= this.$folded_col_size_;
                                }
                                else {
                                    // 아래쪽에 머무르며, 열 번호는 유지된다.
                                    bottom_elements.push_back(element);
                                }
                            }
                        }
                    }
                    else {
                        //========
                        // 세로로 접음
                        //========
                        // 전체 행 크기가 반으로준다
                        this.$folded_row_size_ /= 2;
                        // 앞면을 기준으로, 위에서 아래로 접는다
                        for (var i = 0; i < this.element_array_.size(); i++) {
                            var element = this.element_array_.at(i);
                            if (element.side == core.Side.FRONT) {
                                // 앞면
                                if (element.row < index) {
                                    //--------
                                    // 위에서 아래로 접는다
                                    //	- 뒤집히어 뒷면이 되고,
                                    //	- 행 변호가 역순으로 배치되며,
                                    //	- 열 번호도 역순으로 뒤바뀐다. (앞뒷면은 서로 좌우대칭임).
                                    //--------
                                    folded_elements.push_back(element);
                                    element.angle = (element.angle + 180) % 360; // 180 도 회전
                                    element.side = core.Side.BACK; // 뒷면으로 전환
                                    element.row = this.$folded_row_size_ - element.row - 1; // 역순
                                    element.col = this.$folded_col_size_ - element.col - 1; // 역순
                                }
                                else {
                                    // 아래쪽에 머무르며, 행 번호를 땡겨온다.
                                    bottom_elements.push_back(element);
                                    element.row -= this.$folded_row_size_;
                                }
                            }
                            else {
                                // 뒷면
                                if (element.row < index) {
                                    //--------
                                    // 위에서 아래로 접혀들어간다
                                    //	- 뒤집히어 앞면이 되고,
                                    //	- 행 변호도 역순,
                                    //	- 열 번호도 역순배치 (앞뒷면은 서로 좌우대칭임).
                                    //--------
                                    folded_elements.push_back(element);
                                    element.angle = (element.angle + 180) % 360; // 180 도 회전
                                    element.side = core.Side.FRONT; // 앞면으로 전환
                                    element.row = this.$folded_row_size_ - element.row - 1; // 역순
                                    element.col = this.$folded_col_size_ - element.col - 1; // 역순
                                }
                                else {
                                    // 아래쪽에 머무르며, 행 번호를 땡겨온다.
                                    bottom_elements.push_back(element);
                                    element.row -= this.$folded_row_size_;
                                }
                            }
                        }
                    }
                    //--------
                    // 접지된 원소들끼리의 페이지를 뒤집어줘야 한다.
                    //--------
                    // 우선 페이지 전체를 입력받고
                    var pages = new std.Vector();
                    for (var i = 0; i < folded_elements.size(); i++)
                        pages.push_back(folded_elements.at(i).page);
                    // 정렬한 후, 유니크화한다.
                    std.sort(pages.begin(), pages.end());
                    std.unique(pages.begin(), pages.end());
                    // 그 후, 뒤집힌 원소들의 페이지 번호를 역배치한다.
                    for (var i = 0; i < folded_elements.size(); i++) {
                        var element = folded_elements.at(i);
                        var index_1 = std.find(pages.begin(), pages.end(), element.page).index;
                        // 페이지 순서 뒤집기
                        element.page = pages.rbegin().advance(index_1).value;
                    }
                    // 접히지 않은, 뒷면의 원소들 역시 페이지 번호를 추가해준다.
                    for (var i = 0; i < bottom_elements.size(); i++) {
                        var element = bottom_elements.at(i);
                        element.page += Math.pow(2, this.history_.size());
                    }
                };
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * 행렬 전체 원소의 수.
                 */
                Folder.prototype.count = function () {
                    return 2 * this.row_size_ * this.col_size_;
                };
                /**
                 * 행 크기.
                 */
                Folder.prototype.row_size = function () {
                    return this.row_size_;
                };
                /**
                 * 열 크기.
                 */
                Folder.prototype.col_size = function () {
                    return this.col_size_;
                };
                /**
                 * Get 접지방향 리스트.
                 */
                Folder.prototype.getHistory = function () {
                    return this.history_;
                };
                /**
                 * @hidden
                 */
                Folder.prototype._Fetch_element = function (side, row, col) {
                    var index = row * this.col_size_ + col;
                    if (side == core.Side.BACK)
                        index += this.row_size() * this.col_size();
                    return this.element_array_.at(index);
                };
                /* ---------------------------------------------------------
                    CONVERSION
                --------------------------------------------------------- */
                /**
                 * 페이지 번호를 역순으로 뒤집는다.
                 *
                 * 좌철에서 우철로, 상철에서 하철로 변형할킬 때 사용함.
                 */
                Folder.prototype.reverse = function () {
                    for (var i = 0; i < this.element_array_.size(); i++) {
                        var element = this.element_array_.at(i);
                        element.page = this.count() - element.page + 1;
                    }
                };
                /**
                 * (링제본, 상-하철, 짝수 페이지의) 각도를 반전시킴.
                 *
                 * 짝수 번째 페이지를 180 도 뒤집는다. 링제본일 때 그리고 상철 혹은 하철일 때, 짝수 번째 페이지를 홀수 번째
                 * 페이지와 반전된 방향으로 배치할 때 사용함.
                 */
                Folder.prototype.inverse = function () {
                    for (var i = 0; i < this.element_array_.size(); i++) {
                        var element = this.element_array_.at(i);
                        if (element.page % 2 == 0)
                            element.angle = (element.angle + 180) % 360;
                    }
                };
                /* ---------------------------------------------------------
                    EXPORTERS
                --------------------------------------------------------- */
                /**
                 * 현재의 {@link Folding} 객체를 {@link Page} 객체의 행렬로 변환한다.
                 *
                 * @param side 양단면 코드
                 * @return 행렬 of {@link Page} 객체들
                 */
                Folder.prototype.toMatrix = function (side) {
                    var matrix = new core.Matrix(this.row_size(), this.col_size());
                    for (var r = 0; r < this.row_size(); r++)
                        for (var c = 0; c < this.col_size(); c++) {
                            var element = this._Fetch_element(side, r, c);
                            matrix.set(r, c, new core.Page(element.page, element.angle));
                        }
                    return matrix;
                };
                return Folder;
            }());
            core.Folder = Folder;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * 접지 행위 {@link Folder} 의 각 행렬 원소에 대한 엔티티.
             *
             * {@link Folder} 에서 한 단계씩 접지를 행할 때마다 (@link Folder.fold Folder.fold()), 본 클래스
             * {@link FolderElement} 의 멤버 데이터들이 그에 맞추어 변하게 된다.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var FolderElement = (function () {
                /**
                 * Initializer Constructor.
                 *
                 * @param side 양단면 코드.
                 * @param row 행 번호.
                 * @param col 열 번호.
                 */
                function FolderElement(side, row, col) {
                    // 초기값
                    this.side = side;
                    this.row = row;
                    this.col = col;
                    // 앞면일 때는 1 페이지, 뒷면일 때는 2 페이지.
                    this.page = (side == core.Side.FRONT) ? 1 : 2;
                    this.angle = 0; // 초기 각도: 0도
                }
                return FolderElement;
            }());
            core.FolderElement = FolderElement;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * 행렬 클래스.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var Matrix = (function () {
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Initializer Constructor.
                 *
                 * @param row 행의 크기
                 * @param col 열의 크기
                 */
                function Matrix(row, col) {
                    this.data_ = new Array(row);
                    for (var i = 0; i < row; i++)
                        this.data_[i] = new Array(col);
                }
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * 행 크기.
                 */
                Matrix.prototype.row_size = function () {
                    return this.data_.length;
                };
                /**
                 * 열 크기.
                 */
                Matrix.prototype.col_size = function () {
                    if (this.row_size() == 0)
                        return 0;
                    else
                        return this.data_[0].length;
                };
                /**
                 * 원소에 액세스.
                 *
                 * @param r 행 번호.
                 * @param c 열 번호.
                 *
                 * @return 원소값
                 */
                Matrix.prototype.at = function (r, c) {
                    return this.data_[r][c];
                };
                /**
                 * 원소 값을 변경
                 *
                 * @param r 행 번호.
                 * @param c 열 번호.
                 * @param value 변경할 값.
                 */
                Matrix.prototype.set = function (r, c, value) {
                    this.data_[r][c] = value;
                };
                /**
                 * 데이터 액세스.
                 *
                 * 행렬 원소들이 담긴 2차원 배열이 직접 액세스함.
                 *
                 * @returns 2차원 배열.
                 */
                Matrix.prototype.data = function () {
                    return this.data_;
                };
                /* ---------------------------------------------------------
                    COMPUTATIONS
                --------------------------------------------------------- */
                /**
                 * 전치 행렬.
                 */
                Matrix.prototype.transpose = function () {
                    var matrix = new Matrix(this.col_size(), this.row_size());
                    for (var r = 0; r < this.row_size(); r++)
                        for (var c = 0; c < this.col_size(); c++)
                            matrix.set(c, r, this.at(r, c));
                    return matrix;
                };
                /**
                 * 행렬 좌회전.
                 */
                Matrix.prototype.rotate_left = function () {
                    var matrix = new Matrix(this.col_size(), this.row_size());
                    for (var r = 0; r < this.row_size(); r++)
                        for (var c = 0; c < this.col_size(); c++)
                            matrix.set(this.col_size() - c - 1, r, this.at(r, c));
                    return matrix;
                };
                return Matrix;
            }());
            core.Matrix = Matrix;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * 조판행렬의 원소, 페이지 엔티티.
             *
             * 조편행렬의 원소에 해당하는 페이지 엔티티로써, 현 원소가 대표할 페이지 번호와 각도를 기록함.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var Page = (function (_super) {
                __extends(Page, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Initializer Constructor.
                 *
                 * @param page 페이지 번호.
                 * @param angle 회전 각도.
                 */
                function Page(page, angle) {
                    var _this = _super.call(this) || this;
                    _this.page = page;
                    _this.angle = angle;
                    return _this;
                }
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * 페이지 번호.
                 */
                Page.prototype.getPage = function () {
                    return this.page;
                };
                /**
                 * 회전 각도.
                 */
                Page.prototype.getAngle = function () {
                    return this.angle;
                };
                /**
                 * 좌측으로 90도 회전.
                 */
                Page.prototype.rotate = function () {
                    this.angle -= 90;
                };
                /* ---------------------------------------------------------
                    EXPORTERS
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                Page.prototype.TAG = function () {
                    return "page";
                };
                return Page;
            }(core.protocol.Entity));
            core.Page = Page;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    var _this = _super.call(this) || this;
                    if (image == null)
                        _this.init();
                    else {
                        _this.width = image.width;
                        _this.height = image.height;
                        _this.margin = image.margin;
                        _this.pages = image.pages;
                        _this.copies = image.copies;
                        _this.bindingDirection = image.bindingDirection;
                    }
                    return _this;
                }
                /**
                 * 데이터 초기화. 기본값으로 되돌림.
                 */
                Image.prototype.init = function () {
                    this.width = 210;
                    this.height = 297;
                    this.margin = 5;
                    // 임시 테스트용
                    this.pages = core.Initial.PAGES;
                    this.copies = core.Initial.COPIES;
                    this.bindingDirection = core.Direction.LEFT;
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
                Image.prototype.getBindingDirection = function () { return this.bindingDirection; };
                Image.prototype.setWidth = function (val) { this.width = val; };
                Image.prototype.setHeight = function (val) { this.height = val; };
                Image.prototype.setMargin = function (val) { this.margin = val; };
                Image.prototype.setPages = function (val) { this.pages = val; };
                Image.prototype.setCopies = function (val) { this.copies = val; };
                Image.prototype.setBindingDirection = function (val) { this.bindingDirection = val; };
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
            }(core.protocol.Entity));
            core.Image = Image;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    var _this = _super.call(this) || this;
                    _this.init();
                    return _this;
                }
                /**
                 * @inheritdoc
                 */
                PaperModel.prototype.createChild = function (xml) {
                    return new core.PaperSize();
                };
                /**
                 * 멤버변수 일괄 초기화.
                 */
                PaperModel.prototype.init = function () {
                    this.name = "기본 용지";
                    this.areaPrice = 300;
                    this.clear();
                    // 46 전지
                    this.push(new core.PaperSize(1070, 720), new core.PaperSize(788, 540), new core.PaperSize(1091, 390), new core.PaperSize(788, 360), new core.PaperSize(690, 390), new core.PaperSize(540, 390), new core.PaperSize(788, 270), new core.PaperSize(450, 330), new core.PaperSize(465, 315), new core.PaperSize(788, 216), new core.PaperSize(420, 297), new core.PaperSize(390, 360), new core.PaperSize(540, 260), new core.PaperSize(510, 270), new core.PaperSize(540, 216), new core.PaperSize(410, 260), new core.PaperSize(420, 240), new core.PaperSize(390, 270));
                    // 국전지
                    this.push(new core.PaperSize(939, 636), new core.PaperSize(636, 456), new core.PaperSize(636, 310), new core.PaperSize(465, 315), new core.PaperSize(636, 233), new core.PaperSize(315, 310), new core.PaperSize(465, 210), new core.PaperSize(315, 233), new core.PaperSize(310, 210));
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
                PaperModel.prototype.computePrice = function (process) {
                    var area = this._Compute_main_area(process) + this._Compute_spare_area(process);
                    area = area / 1000 / 1000; // mm² -> m²
                    return area * this.areaPrice;
                };
                /**
                 * 조판에 사용케되는 용지의 총 면적 (장수 기준) 을 계산함.
                 *
                 * @param process 개별 공정
                 * @return 용지의 총 면적
                 *
                 * @see {@link computeUnits}
                 */
                PaperModel.prototype._Compute_main_area = function (process) {
                    // 사용된 용지크기 및 장수에 대한 해쉬맵
                    var units = this.computeUnits(process);
                    var area = 0;
                    // 다 더함
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
                        var paper_size = it.first;
                        var volume = it.second;
                        area += paper_size.computeArea() * volume;
                    }
                    return area;
                };
                /**
                 * 현재의 조판이 필요로 하는 여분지, 그 여분지의 총 면적을 계산함.
                 *
                 * @param process 접지행위자
                 * @return 필요 여분지에 대한 총 면적
                 */
                PaperModel.prototype._Compute_spare_area = function (process) {
                    var price_models = process.getPriceModels();
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
                            area += spares[i].computeSpareArea(process);
                    return area;
                };
                /**
                 * <p> 각 용지사이즈 별로 사용된 장수를 계산한다. </p>
                 *
                 * <p> 개별 공정 {@link Process} 내에 들은 조판면 정보 {@link Placement} 객체들은, 각기 사용한 용지
                 * {@link PaperSize}의 장수가 아닌, 면수 (@link Placement.face_count) 를 기록하고 있다. 이 함수
                 * {@link computeUnits computeUnits()} 에서는, 각 용지크기 ({@link PaperSize}) 별로 사용된 장수를,
                 * 양단면 인쇄를 고려하여 계산하여 해쉬맵의 형태로 리턴한다. </p>
                 *
                 * @param process 개별 공정 엔티티.
                 * @return 각 용지사이즈 및 사용된 장수에 대한 해쉬맵.
                 */
                PaperModel.prototype.computeUnits = function (process) {
                    var units = new std.HashMap();
                    for (var i = 0; i < process.size(); i++) {
                        var placement = process.at(i);
                        var paper_size = placement.getPaperSize();
                        var sheet_count = placement.sheet_count() * placement.copy_count();
                        // 현재의 종이크기가 이미 기록되었는가
                        var it = units.find(paper_size);
                        if (it.equals(units.end()) == true)
                            units.insert(std.make_pair(paper_size, sheet_count)); // 없으면 새로 만들고
                        else
                            it.second += sheet_count; // 있으면 기존의 것에 추가
                    }
                    return units;
                };
                /**
                 * Get 지류; 종이종류명.
                 */
                PaperModel.prototype.getName = function () {
                    return this.name;
                };
                /**
                 * Get 단위면적당 종이가격 가격 ($price / m²).
                 */
                PaperModel.prototype.getPrice = function () {
                    return this.areaPrice;
                };
                Object.defineProperty(PaperModel.prototype, "$name", {
                    /* ---------------------------------------------------------
                        GRID ITEMS
                    --------------------------------------------------------- */
                    /**
                     * @hidden
                     */
                    get: function () { return this.name; },
                    /**
                     * @hidden
                     */
                    set: function (val) { this.name = val; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaperModel.prototype, "$price", {
                    /**
                     * @hidden
                     */
                    get: function () { return this.areaPrice + ""; },
                    /**
                     * @hidden
                     */
                    set: function (val) { this.areaPrice = Number(val); },
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
                PaperModel.prototype.toGridRows = function (process) {
                    var scale = 0.0;
                    for (var i = 0; i < process.size(); i++)
                        scale += process.at(i).getPaperSize().computeArea();
                    var rows = [
                        ////////
                        // 합계
                        ////////
                        {
                            name: "용지",
                            price: this.computePrice(process),
                            comment: "용지 = 용지면적 X 면적대비가격 (m²)"
                        },
                        {
                            name: "\t용지명",
                            comment: this.name
                        },
                        {
                            name: "\t용지면적",
                            comment: core.library.StringUtil.substitute("본지: {1} m², 여분지: {2} m²", core.library.StringUtil.numberFormat(this._Compute_main_area(process) / 1000 / 1000, 4), core.library.StringUtil.numberFormat(this._Compute_spare_area(process) / 1000 / 1000, 4))
                        }
                    ].concat(this._ToGridRows_area(process), [
                        {
                            name: "\t면적당 가격",
                            comment: core.library.StringUtil.numberFormat(this.areaPrice) + " 원 / m²"
                        }
                    ]);
                    return rows;
                };
                /**
                 * @hidden
                 */
                PaperModel.prototype._ToGridRows_area = function (process) {
                    var units = this.computeUnits(process);
                    var rows = [];
                    var i = 0;
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
                        var paper_size = it.first;
                        var volume = it.second;
                        var row = {
                            name: core.library.StringUtil.substitute("\t\t{1}. {2} x {3}", ++i, core.library.StringUtil.numberFormat(paper_size.getWidth()), core.library.StringUtil.numberFormat(paper_size.getHeight())),
                            comment: core.library.StringUtil.substitute("본지 총 {1} 장 -> {2} m²", core.library.StringUtil.numberFormat(volume), core.library.StringUtil.numberFormat(paper_size.computeArea() * volume / 1000 / 1000))
                        };
                        rows.push(row);
                    }
                    return rows;
                };
                return PaperModel;
            }(core.protocol.EntityArrayCollection));
            core.PaperModel = PaperModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * 종이모형 리스트.
             *
             * 종이모형 편집기, 데이터 그리드에 각 종이모형을 표기하기 위한 데이터 프로바이더 컬렉션이다.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var PaperModelArray = (function (_super) {
                __extends(PaperModelArray, _super);
                function PaperModelArray() {
                    return _super.apply(this, arguments) || this;
                }
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                // using super::constructor
                /**
                 * 멤버변수 일괄 초기화.
                 */
                PaperModelArray.prototype.init = function () {
                    // 현 리스트에 초기화된 모형 하나만
                    var paper = new core.PaperModel();
                    paper.init();
                    // 유지한다
                    this.clear();
                    this.push_back(paper);
                };
                /**
                 * @inheritdoc
                 */
                PaperModelArray.prototype.createChild = function (xml) {
                    return new core.PaperModel();
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
            }(core.protocol.EntityArrayCollection));
            core.PaperModelArray = PaperModelArray;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    var _this = _super.call(this) || this;
                    // SWAP, 가로를 큰 쪽으로 둔다
                    if (width < height)
                        _a = [height, width], width = _a[0], height = _a[1];
                    // INITIALIZE
                    _this.width = width;
                    _this.height = height;
                    return _this;
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
                /* =========================================================
                    ACCESSORS
                        - MEMBERS
                        - OPERATORS
                ============================================================
                    MEMBERS
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
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
                /* ---------------------------------------------------------
                    OPERATORS
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                PaperSize.prototype.less = function (obj) {
                    return this.computeArea() < obj.computeArea();
                };
                /**
                 * @inheritdoc
                 */
                PaperSize.prototype.equals = function (obj) {
                    return this.width == obj.width && this.height == obj.height;
                };
                Object.defineProperty(PaperSize.prototype, "$width", {
                    /**
                     * @hidden
                     */
                    get: function () { return this.width + ""; },
                    /**
                     * @hidden
                     */
                    set: function (val) { this.width = Number(val); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaperSize.prototype, "$height", {
                    /**
                     * @hidden
                     */
                    get: function () { return this.height + ""; },
                    /**
                     * @hidden
                     */
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
            }(core.protocol.Entity));
            core.PaperSize = PaperSize;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * 조판면 배치 정보.
             *
             * {@link Placement} 는 개별 공정 {@link Process} 에 소속되는, 조판면 배치 정보를 가진 {@link Entity} 및
             * Calculator 클래스이다.
             *
             * 현 조판면이 각 페이지를 어떻게 배치하는 지 ({@link row_count}, {@link col_count}, {@link image_count}),
             * 이러한 조판면 배치가 몇 회 반복되는 지 ({@link face_count}) 및 어떠한 분할이 행해지는 지
             * ({@link inverse_count}, {@link plaste_coiunt}) 등의 정보를 가진다.
             *
             * 또한 Placement 는, 현 조판면 내에 각 페이지가 어떻게 배치되는 지 계산해주는 Wrap 클래스를
             * Composition 관계로 소유하고 있다.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var Placement = (function (_super) {
                __extends(Placement, _super);
                function Placement() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var _this = _super.call(this) || this;
                    if (args[0] instanceof Placement) {
                        //--------
                        // COPY CONSTRUCTOR
                        //--------
                        var obj = args[0];
                        // BAISC MEMBERS
                        _this.process_ = obj.process_;
                        _this.paper_size_ = obj.paper_size_;
                        // PROPERTIES
                        _this.rows = obj.rows;
                        _this.cols = obj.cols;
                        _this.rotated = obj.rotated;
                        _this.image_count_ = obj.image_count_;
                        _this.face_count_ = obj.face_count_;
                        //this.assign(obj.begin(), obj.end());
                        // DIVIDES
                        _this.inverse_count_ = obj.inverse_count_;
                        _this.plaste_count_ = obj.plaste_count_;
                    }
                    else {
                        _this.process_ = args[0];
                        if (args.length == 2) {
                            _this.paper_size_ = args[1];
                            // PROPERTIES
                            _this._Construct_counts();
                            _this.image_count_ = _this.max_image_count();
                            _this.face_count_ = 1;
                            // DIVIDES
                            _this.inverse_count_ = 1;
                            _this.plaste_count_ = 1;
                        }
                    }
                    _this.dependency_ = null;
                    _this.dependent_ = null;
                    return _this;
                }
                Object.defineProperty(Placement.prototype, "device_", {
                    /**
                     * @hidden
                     */
                    get: function () { return this.process_.getDevice(); },
                    enumerable: true,
                    configurable: true
                });
                ; // 오프셋 장치
                Object.defineProperty(Placement.prototype, "image_", {
                    /**
                     * @hidden
                     */
                    get: function () { return this.process_.getImage(); } // 배치할 이미지
                    ,
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
                        if (this.process_.getPaper().has(size_pair) == true)
                            this.paper_size_ = this.process_.getPaper().get(size_pair);
                        else
                            this.paper_size_ = null;
                    }
                    else
                        this.paper_size_ = null;
                    _super.prototype.construct.call(this, xml);
                };
                /**
                 * @inheritdoc
                 */
                Placement.prototype.createChild = function (xml) {
                    return new core.Wrap(this);
                };
                /**
                 * 현 조판면을 확장.
                 *
                 * @param placement 타깃 조판면
                 */
                Placement.prototype.plaste_expand = function (placement) {
                    // 몇 배수로 확장하는가
                    this.plaste_count_ = placement.max_image_count() / this.max_image_count();
                    // 사용할 조판 용지를 (더 큰 것으로) 바꾸고
                    this.paper_size_ = placement.paper_size_;
                    this._Construct_counts(); // 행렬과 배치가능 이미지 수를 새로이 구성한다.
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
                    //// 기존의 조판 배치 정보를 지우고
                    //this.clear();
                    // 멤버 변수들을 바꿔준다.
                    this.image_count_ = imageCount;
                    this.face_count_ = faceCount;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Construct_counts = function () {
                    //--------
                    // 수량 count 에 관련된 멤버 원소들을 구성한다.
                    //
                    // 현 배치정보 Placement 에 배치할 수 있는 최대 이미지 수량을, 이미지의 배치방향 및 행렬의 크기와 
                    // 함께 계산해낸다.
                    //--------
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
                    var cols = this._Floor(this.computePrintableWidth() / (this.image_.getWidth() + this.image_.getMargin()));
                    var rows = this._Floor(this.computePrintableHeight() / (this.image_.getHeight() + 2 * this.image_.getMargin()));
                    /////
                    // ROTATED COUNTS
                    /////
                    var rotated_cols = this._Floor(this.computePrintableWidth()
                        /
                            (this.image_.getHeight() + 2 * this.image_.getMargin()));
                    var rotated_rows = this._Floor(this.computePrintableHeight()
                        /
                            (this.image_.getWidth() + this.image_.getMargin()));
                    // ONLY A COL IN A PAGE, HOWEVER ONE DIRECTION CAN BE INVALID
                    if (cols == 1 && rotated_cols == 1 && rows >= 1 && rotated_rows >= 1) {
                        // ROTATED IS INVALID OR (NON-ROTATED IS VALID AND COUNT OF ROW IS ALSO GREATER)
                        if (this.computePrintableWidth() < this.image_.getHeight() + 2 * this.image_.getMargin()
                            || ((this.computePrintableWidth() >= this.image_.getWidth() + 2 * this.image_.getMargin())
                                && rows >= rotated_cols)) {
                            this.rotated = false;
                        }
                    }
                    else
                        this.rotated = (rows * cols < rotated_rows * rotated_cols);
                    if (this.rotated == false) {
                        this.rows = rows;
                        this.cols = cols;
                    }
                    else {
                        this.rows = rotated_rows;
                        this.cols = rotated_cols;
                    }
                };
                /* =========================================================
                    ACCESSROS
                         - MEMBRES
                         - PROPERTIES
                         - HIDDEN ACCESSORS
                         - COLUMNS
                         - CALCULATORS
                ============================================================
                    MEMBERS
                --------------------------------------------------------- */
                /**
                 * Get 공정 객체.
                 *
                 * @return 현 조판면 모형의 소속 공정.
                 */
                Placement.prototype.getProcess = function () {
                    return this.process_;
                };
                /**
                 * Get 용지 크기.
                 *
                 * @returns 현 조편면이 사용케 될 용지크기. 즉 현 조판면의 크기.
                 */
                Placement.prototype.getPaperSize = function () {
                    return this.paper_size_;
                };
                /**
                 * Get 배치케 될 이미지.
                 */
                Placement.prototype.getImage = function () {
                    return this.image_;
                };
                /**
                 * Get 속국.
                 *
                 * 여백을 남기는 대형 조판을 행한 경우; 자식 조판.
                 */
                Placement.prototype.getDependency = function () {
                    return this.dependency_;
                };
                /**
                 * Get 종속 부모.
                 *
                 * 여백을 남기는 대형 조판을 행한 경우; 부모 조판.
                 */
                Placement.prototype.getDependent = function () {
                    return this.dependent_;
                };
                /* ---------------------------------------------------------
                    PROPERTIES
                --------------------------------------------------------- */
                /**
                 * 세로로 배치할 수 있는 최대 행 크기.
                 */
                Placement.prototype.row_size = function () {
                    return this.rows;
                };
                /**
                 * 가로로 배치할 수 있는 최대 열 크기.
                 */
                Placement.prototype.col_size = function () {
                    return this.cols;
                };
                /**
                 * 현재의 조판면에 쌓을 수 있는 최대 이미지 수.
                 *
                 * 단, 아무리 많은 이미지를 배치 가능하더라도, 한 판면에 최대 배치 가능한 이미지 수는 오로지 8 장이다.
                 *
                 * @return 조판 가능한 최대 이미지 수 (0 ~ 8).
                 */
                Placement.prototype.max_image_count = function () {
                    var count = this.rows * this.cols;
                    return Math.min(count, 8); // 8을 초과할 수 없다.
                };
                /**
                 * 회전 여부.
                 */
                Placement.prototype.isRotated = function () {
                    return this.rotated;
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
                 * 한 부 내에서 쓰이는 판면 수만을 의미한다. 전체 사본 부수와 돈땡 및 판걸이를 반영한 판면 수가 아님.
                 */
                Placement.prototype.face_count = function () {
                    var side = this.process_.computeSide();
                    // 보통은 속성값을 따르나
                    if (side == core.Side.DOUBLE || this.image_count_ == 1 || this.process_.getDevice().isFolding() == false)
                        return this.face_count_;
                    else
                        return this.face_count_ * 2;
                };
                /**
                 * 현 조판면이 사용하게 될 용지 장 수.
                 */
                Placement.prototype.sheet_count = function () {
                    if (this.process_.computeSide() == core.Side.FRONT)
                        return this.face_count_; // 판면수와 장수가 같다.
                    else if (this.inverse_count_ == 2)
                        return this.face_count_;
                    else if (this.dependent_ != null)
                        return 0; // 특정 면에 종속될 때는, 0장 사용
                    else
                        return Math.ceil(this.face_count_ / 2); // 그 외, 판면수의 반을 사용
                };
                /**
                 * 사본 수를 계산한다.
                 *
                 * 보통은 부수를 따라가나, 돈땡이나 판걸이에 의해 사본 수가 줄어드는 경우가 있다.
                 *
                 * @return 조정된 사본 수량.
                 */
                Placement.prototype.copy_count = function () {
                    return Math.ceil(this.image_.getCopies() / (this.inverse_count_ * this.plaste_count_));
                };
                /**
                 * 현 조판면 하나에 들어갈 수 있는 최대 페이지 수.
                 */
                Placement.prototype.page_count = function () {
                    if (this.process_.computeSide() == core.Side.FRONT || this.inverse_count_ == 2)
                        return this.image_count_;
                    else
                        return this.image_count_ * 2;
                };
                /**
                 * 역전 판면 분할 개수; 돈땡.
                 *
                 * 양면 조판에 판면의 수가 홀수 개일 경우, 마지막 페이지에 행하는 분할 (돈땡) 수.
                 *
                 * 판의 한 면에 앞뒷면 페이지가 교차하여 배치된다.
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
                 * Get 종속된 조판. 속국 or 종속 부모.
                 */
                Placement.prototype.getLink = function () {
                    if (this.dependency_ != null)
                        return this.dependency_;
                    else if (this.dependent_ != null)
                        return this.dependent_;
                    else
                        return null;
                };
                /**
                 * 현 조판이 유효한 지 검사한다.
                 *
                 * 유효성 검사는 오로지 양면 조판일 때만 행한다. 양편 조판이되 홀수의 조판면을 사용하는 경우, 그리고
                 * 돈땡이나 판걸이 등의 분할을 행하지 않은 경우에 유효하지 않은 조판으로 간주된다.
                 *
                 * @param side 양단면 코드.
                 * @return 유효성.
                 */
                Placement.prototype.validate = function (side) {
                    // 연결관계 (공백 허가 조판) 에 있는 경우, 합산하고 시작함
                    var face_count = this.face_count_;
                    if (this.getLink() != null)
                        face_count += this.getLink().face_count_;
                    // 다음 경우엔 무조건적으로 유효함
                    //	- 단면이거나,
                    //	- 양면이더라도 짝수 판면수를 가지거나
                    //	- 홀수의 판면수더라도 마지막 이미지 1장이 남은 경우 (또는 마지막 이미지 1장을 판걸이 한 경우)
                    if (side == 1 || face_count % 2 == 0
                        || (this.getLink() == null && (this.image_count_ / this.plaste_count_) == 1 && this.face_count_ == 1))
                        return true;
                    //----
                    // 여기서부터는 최소 양면 조판에 홀수 판면수를 가짐
                    //----
                    if (this.inverse_count_ > 1)
                        return true; // 돈땡의 경우 유효
                    else
                        return false; // 그 외에는 무효
                };
                /* ---------------------------------------------------------
                    HIDDEN ACCESSORS
                --------------------------------------------------------- */
                /**
                 * @hidden
                 */
                Placement.prototype._Get_face_count = function () {
                    return this.face_count_;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Set_face_count = function (val) {
                    this.face_count_ = val;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Subtract_face_count = function () {
                    --this.face_count_;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Set_inverse_count = function (val) {
                    this.inverse_count_ = val;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Set_dependency = function (obj) {
                    this.dependency_ = obj;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Set_dependent = function (obj) {
                    this.dependent_ = obj;
                };
                Object.defineProperty(Placement.prototype, "$width", {
                    /* ---------------------------------------------------------
                        COLUMNS
                    --------------------------------------------------------- */
                    /**
                     * @hidden
                     */
                    get: function () {
                        return core.library.StringUtil.numberFormat(this.paper_size_.getWidth()) + " mm";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Placement.prototype, "$height", {
                    /**
                     * @hidden
                     */
                    get: function () {
                        return core.library.StringUtil.numberFormat(this.paper_size_.getHeight()) + " mm";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Placement.prototype, "$image_count", {
                    /**
                     * @hidden
                     */
                    get: function () {
                        // 기본 텍스트
                        var ret = core.library.StringUtil.numberFormat(this.image_count_) + " 장";
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
                    /**
                     * @hidden
                     */
                    get: function () {
                        return core.library.StringUtil.substitute("{1} 면 ({2} 장)", core.library.StringUtil.numberFormat(this.face_count()), core.library.StringUtil.numberFormat(this.sheet_count()));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Placement.prototype, "$copies", {
                    /**
                     * @hidden
                     */
                    get: function () {
                        // 기본 텍스트
                        var ret = core.library.StringUtil.numberFormat(this.copy_count()) + " 부";
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
                            ret += core.library.StringUtil.substitute(" (I{1}, P{2})", fraction_symbol_map.get(this.inverse_count_), fraction_symbol_map.get(this.plaste_count_));
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
                    /**
                     * @hidden
                     */
                    get: function () {
                        if (this.rotated == true)
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
                    return this.paper_size_.getWidth() - this.device_.computeBitedWidth() - 2 * this.device_.getNonPrintableWidth();
                };
                /**
                 * 인쇄 가능 영역 中 세로 길이를 계산.
                 */
                Placement.prototype.computePrintableHeight = function () {
                    return this.paper_size_.getHeight() - this.device_.computeBitedHeight() - 2 * this.device_.getNonPrintableHeight();
                };
                /**
                 * (회전 후의) 이미지 가로 길이를 계산.
                 */
                Placement.prototype.computeImageWidth = function () {
                    return (this.rotated == false) ? this.image_.getWidth() : this.image_.getHeight();
                };
                /**
                 * (회전 후의) 이미지 세로 길이를 계산.
                 */
                Placement.prototype.computeImageHeight = function () {
                    return (this.rotated == false) ? this.image_.getHeight() : this.image_.getWidth();
                };
                /**
                 * 현 배치 조판면을 사용하는 첫 페이지.
                 */
                Placement.prototype.computeFirstPage = function () {
                    var it = std.find(this.process_.begin(), this.process_.end(), this);
                    if (it.equals(this.process_.begin()))
                        return 1;
                    var prev_placement = it.prev().value;
                    var page = prev_placement.computeLastPage() + 1;
                    return page;
                };
                /**
                 * 현 배치 조판면을 사용하는 마지막 페이지.
                 */
                Placement.prototype.computeLastPage = function () {
                    var start_page = this.computeFirstPage();
                    var pages = this.image_count() * this.face_count_ / this.plaste_count();
                    return start_page + pages - 1;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Compute_space_utilization_ratio = function () {
                    //--------
                    // 공간 활용률을 계산한다; 최대 배치 가능 이미지 수 기준.
                    //--------
                    var width = this.computeImageWidth();
                    var height = this.computeImageHeight();
                    var margin = this.image_.getMargin();
                    var numerator = this.image_count_ * (width + 2 * margin) * (height + 2 * margin);
                    var denominator = this.computePrintableWidth() * this.computePrintableHeight();
                    if (this.rotated == false && this.cols > 1)
                        numerator -= this.image_count_ * margin * (height + 2 * margin);
                    else if (this.rotated == true && this.rows > 1)
                        numerator -= this.image_count_ * margin * (width + 2 * margin);
                    return numerator / denominator;
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Containable = function () {
                    //--------
                    // 현재의 조판에, 단 한 장의 이미지라도 배치할 수 있는가를 알아본다.
                    //--------
                    return (this.computePrintableWidth() >= this.image_.getWidth() + 2 * this.image_.getMargin()
                        && this.computePrintableHeight() >= this.image_.getHeight() + 2 * this.image_.getHeight())
                        || (this.computePrintableHeight() >= this.image_.getWidth() + 2 * this.image_.getMargin()
                            && this.computePrintableHeight() >= this.image_.getHeight() + 2 * this.image_.getHeight());
                };
                /**
                 * @hidden
                 */
                Placement.prototype._Floor = function (val) {
                    //--------
                    // 현 조판의 행렬에 대하여 버림 연산을 행함.
                    // 
                    // 한 조판면에 최대 배치 가능한 이미지의 수량은 8장이다. 또한, 접지를 행하기 때문에 각 행렬의 길이는 1 
                    // 또는 짝수의 숫자를 가져야만 한다. 때문에 각 행렬의 길이는 {0, 1, 2, 4} 중에 하나를 가지게 된다.
                    // 
                    // @param val 버림을 행할 수
                    // @return 버림연산을 행한 수
                    //--------
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
                    if (this.paper_size_ != null)
                        xml.setProperty("paperSize", this.paper_size_.getWidth() + "x" + this.paper_size_.getHeight());
                    // 기본 정보
                    xml.setProperty("images", this.image_count_ + "");
                    xml.setProperty("faces", this.face_count_ + "");
                    xml.setProperty("sheets", this.sheet_count() + "");
                    xml.setProperty("copies", this.copy_count() + "");
                    // 부가 정보
                    xml.setProperty("plastes", this.plaste_count_ + "");
                    xml.setProperty("inverses", this.inverse_count_ + "");
                    xml.setProperty("firstPage", this.computeFirstPage() + "");
                    xml.setProperty("lastPage", this.computeLastPage() + "");
                    return xml;
                };
                return Placement;
            }(core.protocol.Entity));
            core.Placement = Placement;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                function OptionalModel() {
                    var _this = _super.call(this) || this;
                    _this.init();
                    return _this;
                }
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
                 * @param process 접지행위자
                 * @return 필요 여분지에 대한 총 면적
                 */
                OptionalModel.prototype.computeSpareArea = function (process) {
                    if (this.isUsed() == false)
                        return 0;
                    var area = 0;
                    for (var i = 0; i < process.size(); i++) {
                        var placement = process.at(i);
                        var my_area = placement.getPaperSize().computeArea();
                        my_area *= this.sparePapers * placement.sheet_count();
                        area += my_area;
                    }
                    return area;
                };
                /**
                 * <p> 각 조판에 대한 판면수를 계산함. </p>
                 *
                 * <p> {@link Placement} 는 기본적으로 판면수를 가지고 있다. 하지만, 양면 인쇄를 행할 경우,
                 * 양단면 구분이 없는, 단면만을 가지는 현 모형의 특성상, {@link Placement} 가 가리키는 판면수를
                 * 그대로 사용할 수는 없다. (판면수를 절반으로 낮추어 사용해야함). </p>
                 *
                 * <p> {@link computeFaceCounts computeFaceCounts()} 는 이러한 경우에 대응키
                 * 위하여, 각 조판면별로 조정된 판면수를 산출해주는 함수이다. 현 공정은 홀수 판면에만 행해진다
                 * 가정하고, 이에 맞추어 조정된 판면수를 {@link Placement}와 묶은 {@link std.Pair} 객체들을
                 * 배열에 담아 리턴한다. </p>
                 *
                 * @param process 개별 공정 엔티티.
                 * @return Process에 속하는 각 조판 (Process) 및 해당 조판에 대한 판면수 Pair에 대한 Vector.
                 */
                OptionalModel.prototype.computeFaceCounts = function (process) {
                    var count_pairs = new std.Vector(process.size(), null);
                    for (var i = 0; i < process.size(); i++)
                        count_pairs.set(i, std.make_pair(process.at(i), process.at(i).face_count()));
                    // 접지를 행하는 경우나,
                    // 접지를 행하지 않더라도 인쇄가 단면인 경우에
                    // 판면수의 조정은 없다.
                    if (process.getDevice().isFolding() == true || process.computeSide() == core.Side.SINGLE)
                        return count_pairs;
                    for (var i = 0; i < count_pairs.size(); i++) {
                        ////////
                        // 현 모형은 단면, 하지만 인쇄는 양면
                        //	- 조판면이 절반으로 준다.
                        //	- 앞면에만 조판을 찍어야 한다.
                        ////////
                        // 앞, 뒷면에 대한 Flag
                        var is_front = true;
                        for (var i_1 = 0; i_1 < count_pairs.size(); i_1++) {
                            // Element, Pair of Placement object and its face count.
                            var pair = count_pairs.at(i_1);
                            var placement = pair.first; // 기준 조판면 -> 양면
                            //--------
                            // 돈땡이 행해진 경우, 한 판에 앞-뒷면이 양립하고 있기에
                            // 분할의 대상이 아니다.
                            //--------
                            if (placement.inverse_count() != 1)
                                continue;
                            // 판면수를 2로 나누주되,
                            var face_count = void 0;
                            if (is_front)
                                face_count = Math.ceil(placement.face_count() / 2);
                            else
                                face_count = Math.floor(placement.face_count() / 2);
                            pair.second = face_count;
                            // 현 조판면의 실제 판면수가 홀수였을 경우, 앞-뒷면에 대한 flag 를 뒤집음
                            if (placement.face_count() % 2 == 1)
                                is_front = !is_front;
                        }
                    }
                    return count_pairs;
                };
                OptionalModel.prototype.isUsed = function () { return this.used; };
                OptionalModel.prototype.getSparePapers = function () { return this.sparePapers; };
                OptionalModel.prototype.setUsed = function (val) { this.used = val; };
                OptionalModel.prototype.setSparePapers = function (val) { this.sparePapers = val; };
                OptionalModel.prototype.toGridRows_sparePapers = function (process) {
                    var rows = [{
                            name: "\t여분지",
                            comment: "1 판장 당 " + this.sparePapers + " 장 -> 총 " +
                                core.library.StringUtil.numberFormat(this.computeSpareArea(process) / 1000 / 1000) + " m^2"
                        }];
                    for (var i = 0; i < process.size(); i++) {
                        var placement = process.at(i);
                        var paper_size = placement.getPaperSize();
                        var area = paper_size.computeArea();
                        area *= this.sparePapers * placement.sheet_count();
                        rows.push({
                            name: core.library.StringUtil.substitute("\t\t{1}. {2} x {3}", i + 1, core.library.StringUtil.numberFormat(paper_size.getWidth()), core.library.StringUtil.numberFormat(paper_size.getHeight())),
                            comment: core.library.StringUtil.substitute("x {1} 판장 x {2} 여분지 장 = {3} m^2", placement.sheet_count(), this.sparePapers, core.library.StringUtil.numberFormat(area / 1000 / 1000))
                        });
                    }
                    return rows;
                };
                return OptionalModel;
            }(core.protocol.Entity));
            core.OptionalModel = OptionalModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
/// <reference path="OptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    return _super.apply(this, arguments) || this;
                }
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                // using super::constructor
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                SideOptionalModel.prototype.getSide = function () {
                    return this.side;
                };
                SideOptionalModel.prototype.setSide = function (val) {
                    this.side = val;
                };
                /**
                 * <p> 각 조판에 대한 판면수를 계산함. </p>
                 *
                 * <p> {@link Placement} 는 기본적으로 판면수를 가지고 있다. 하지만, 현 공정과 인쇄가 가지는
                 * 양단면 코드가 다를 경우 (현 공정은 단면인데 인쇄는 양면이거나 혹은 그 반대),
                 * {@link Placement} 가 가리키는 판면수를 그대로 사용할 수는 없다. </p>
                 *
                 * <ul>
                 *	<li> {@link side} vs. {@link PrintModel.side} </li>
                 * </ul>
                 *
                 * <p> {@link computeFaceCounts computeFaceCounts()} 는 이러한 경우에 대응키
                 * 위하여, 각 조판면별로 조정된 판면수를 산출해주는 함수이다. 현 공정이 양면에 인쇄가 단면이라면
                 * 조판면 수를 2배로 하고, 현 공정이 단면에 인쇄가 양면이라면 현 공정은 홀수 판면에만 행해진다
                 * 가정하고 이에 맞추어 조정된 판면수를 계산해낸다 (돈땡의 경우에는 해당 없음). 이렇게 산출된
                 * (조정된) 판면수를 {@link Placement} 객체와 묶은 {@link std.Pair} 객체들을 배열에 담아
                 * 리턴한다. </p>
                 *
                 * @param process 개별 공정 엔티티.
                 * @return Process에 속하는 각 조판 (Process) 및 해당 조판에 대한 판면수 Pair에 대한 Vector.
                 */
                SideOptionalModel.prototype.computeFaceCounts = function (process) {
                    ////////
                    // 접지를 행하는 경우나, 
                    // 접지를 행하지 않더라도 현 모형은 단면에 인쇄는 양면인 경우
                    //	- 조판면이 절반으로 준다.
                    //	- 부모 함수에서 정의된 케이스
                    ////////
                    if (process.getDevice().isFolding() == true
                        || (this.side == core.Side.SINGLE && process.computeSide() == core.Side.DOUBLE))
                        return _super.prototype.computeFaceCounts.call(this, process);
                    // 각 조판면과 해당 조판면의 판면수를 할당함
                    var count_pairs = new std.Vector(process.size(), null);
                    for (var i = 0; i < process.size(); i++)
                        count_pairs.set(i, std.make_pair(process.at(i), process.at(i).face_count()));
                    if (this.side == process.computeSide()) {
                        // 현 모형과 인쇄의 양단면 코드가 같으면, 
                        // 판면수의 조정없이, 이대로 리턴
                        return count_pairs;
                    }
                    else {
                        ////////
                        // 현 모형은 양면, 하지만 인쇄는 단면
                        //	- 조판면이 두 배로 는다.
                        //	- 인쇄된 면 (앞면) 외에 뒷면에도 조판을 찍어줘야 한다.
                        ////////
                        for (var i = 0; i < count_pairs.size(); i++)
                            count_pairs.at(i).second *= 2;
                    }
                    return count_pairs;
                };
                return SideOptionalModel;
            }(core.OptionalModel));
            core.SideOptionalModel = SideOptionalModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    return _super.apply(this, arguments) || this;
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
                    this.inkAreaPercentage = 7;
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
                FoilModel.prototype.computePrice = function (process) {
                    if (this.isUsed() == false)
                        return 0;
                    return this._Compute_work_price(process)
                        + this._Compute_copper_price(process)
                        + this._Compute_ink_price(process);
                };
                /**
                 * 단위 수를 계산함.
                 */
                FoilModel.prototype._Compute_units = function (process) {
                    // 각 조판면 및 그에 대한 (조정된) 판면수.
                    var count_pairs = this.computeFaceCounts(process);
                    // 각 면마다 별개의 작업 (유닛) 으로 친다
                    // 각 면마다, 사본 수량만큼 찍게 되는데, 이 때 사본의 수량이 각 면의 작업 유닛 수를 결정함
                    var units = 0;
                    for (var i = 0; i < count_pairs.size(); i++) {
                        var pair = count_pairs.at(i);
                        var placement = pair.first;
                        var face_count = pair.second;
                        // 현재의 조판면에, 사본 면수에 대한 단위수를 곱하여 더함
                        units += face_count * Math.ceil(placement.copy_count() / this.workFaces);
                    }
                    return units;
                };
                FoilModel.prototype._Compute_work_price = function (process) {
                    return this.workPrice * this._Compute_units(process);
                };
                FoilModel.prototype._Compute_copper_area = function (process) {
                    var image = process.getImage();
                    var pages = process.getImage().getPages();
                    // 박과 인쇄의 양단면 코드가 다를 경우
                    if (this.side != process.computeSide())
                        if (this.side == 1)
                            pages = Math.ceil(pages / 2); // 페이지 수는 절반으로 준다
                        else
                            pages = pages * 2; // 페이지 수는 2배로 뛴다
                    // 이미지 당 면적
                    var area = image.computeArea() * (this.inkAreaPercentage / 100.0);
                    area *= pages; // x 페이지 수
                    // 이미지 면적 X 페이지 수
                    return area;
                };
                FoilModel.prototype._Compute_copper_price = function (process) {
                    // 한 판 동판비 = 200원 / cm²
                    return this.copperPrice * this._Compute_copper_area(process) / 100.0; // mm² -> cm²
                };
                FoilModel.prototype._Compute_ink_area = function (process) {
                    // 박 면적 x 사본 수량
                    return this._Compute_copper_area(process) * process.getImage().getCopies();
                };
                FoilModel.prototype._Compute_ink_price = function (process) {
                    return (this.inkPrice * this._Compute_ink_area(process)) / (1000.0 * 1000.0);
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
                    return this.inkAreaPercentage;
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
                    this.inkAreaPercentage = val;
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
                FoilModel.prototype.toGridRows = function (process) {
                    if (this.isUsed() == false)
                        return [];
                    var image = process.getImage();
                    var rows = [
                        ////////
                        // 합계
                        ////////
                        {
                            name: "박",
                            price: this.computePrice(process),
                            comment: "박비 = 작업비 + 동판비 + 박비"
                        },
                        ////////
                        // 작업비
                        ////////
                        {
                            name: "\t작업비",
                            sub_price: this._Compute_work_price(process),
                            comment: "작업비 = 작업단위 X 단위당작업비"
                        },
                        {
                            name: "\t\t작업단위",
                            comment: core.library.StringUtil.substitute("({1} 판면 X {2} 부) / {3} 판면 = {4} 단위", core.library.StringUtil.numberFormat(process.computeFaceCount()), core.library.StringUtil.numberFormat(process.getImage().getCopies()), this.workFaces, core.library.StringUtil.numberFormat(this._Compute_units(process)))
                        }
                    ].concat(this._ToGridRows_units(process), [
                        {
                            name: "\t\t단위당 작업비",
                            comment: core.library.StringUtil.numberFormat(this.workPrice) + " 원"
                        },
                        ////////
                        // 동판비
                        ////////
                        {
                            name: "\t동판비",
                            sub_price: this._Compute_copper_price(process),
                            comment: "동판비 = 총면적 X 면적당동판비"
                        },
                        {
                            name: "\t\t총면적",
                            comment: core.library.StringUtil.substitute("{1} mm² X {2} 페이지 X {3} % = {4} cm²", core.library.StringUtil.numberFormat(process.getImage().computeArea()), core.library.StringUtil.numberFormat(process.getImage().getPages()), core.library.StringUtil.numberFormat(this.inkAreaPercentage), core.library.StringUtil.numberFormat(this._Compute_copper_area(process) / 100.0 // mm² -> cm²
                            ))
                        },
                        {
                            name: "\t\t면적당 동판비",
                            comment: core.library.StringUtil.numberFormat(this.copperPrice) + " 원 / cm²"
                        },
                        ////////
                        // 박비
                        ////////
                        {
                            // 보다 상세히
                            name: "\t박비",
                            sub_price: this._Compute_ink_price(process),
                            comment: "박비 = 박 면적 X 면적당박비"
                        },
                        {
                            name: "\t\t박 면적",
                            comment: core.library.StringUtil.substitute("{1} m² X {2} 부 = {3} m²", core.library.StringUtil.numberFormat(image.computeArea() * image.getPages()), core.library.StringUtil.numberFormat(process.getImage().getCopies()), core.library.StringUtil.numberFormat(this._Compute_ink_area(process) / 1000 / 1000))
                        },
                        {
                            name: "\t\t면적당 작업비",
                            comment: core.library.StringUtil.numberFormat(this.inkPrice) + " 원 / m²"
                        }
                    ], this.toGridRows_sparePapers(process));
                    return rows;
                };
                FoilModel.prototype._ToGridRows_units = function (process) {
                    var rows = [];
                    var face_counts = this.computeFaceCounts(process);
                    for (var i = 0; i < face_counts.size(); i++) {
                        var pair = face_counts.at(i);
                        var placement = pair.first;
                        var face_count = pair.second;
                        var units = face_count * Math.ceil(placement.copy_count() / this.workFaces);
                        var row = {
                            name: core.library.StringUtil.substitute("\t\t\t{1}. {2} x {3}", i + 1, core.library.StringUtil.numberFormat(placement.getPaperSize().getWidth()), core.library.StringUtil.numberFormat(placement.getPaperSize().getHeight())),
                            comment: core.library.StringUtil.substitute("{1} 판면, {2} -> {3} 단위", core.library.StringUtil.numberFormat(face_count), placement.$copies, core.library.StringUtil.numberFormat(units))
                        };
                        rows.push(row);
                    }
                    return rows;
                };
                return FoilModel;
            }(core.SideOptionalModel));
            core.FoilModel = FoilModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    return _super.apply(this, arguments) || this;
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
                LaminatingModel.prototype.computePrice = function (process) {
                    if (this.isUsed() == false)
                        return 0;
                    // 라미네이팅 가격 = 기본금 + 추가비용
                    return this._Compute_base_price(process) + this._Compute_over_price(process);
                };
                /**
                 * <p> 각 유닛 (종이 크기에 따른 면 수) 을 계산함. </p>
                 *
                 * <p> 라미네이팅은 각 조편만여 아닌, 각 용지크기 별로 단위수륾 매긴다.
                 * {@link compute_units compute_units()} 는 각 용지 크기 별로, 사용된 총 면수를 구하여 해쉬맵의 형태로
                 * 리턴한다. (key: 용지크기를 대표하는 {@link PaperSize} 객체, value: 해당 용지크기로 조판되는 총 면 수).
                 * </p>
                 *
                 * <p> 단, 접지를 행하지 않는 가운데에 현 라미네이팅과 인쇄의 양단면 코드가 다를 경우 (라미네이팅은 단면인데
                 * 인쇄는 양면이거나 혹은 그 반대), {@link Placement} 에 기록된 판면수를 그대로 사용할 수 없게 된다. </p>
                 *
                 * <p> {@link compute_units compute_units()} 은 이 때 각 용지크기의 판면수를 조정하게 되는데, 라미네이팅이
                 * 양면에 인쇄가 단멸일 경우 각 용지크기의 판면수를 2배로, 라미네이팅이 단면에 인쇄가 양면일 경우에는
                 * 라미네이팅이 홀수 판면에만 행해진다 가정하고 이에 맞추어 조정된 판면수를 계산해낸다 (돈땡의 경우에는 해당
                 * 없음). </p>
                 *
                 * @param process 개별 공정 엔티티.
                 * @return 각 유닛에 대한 컨테이너 (key: 종이 크기, value: 사용된 면 수)
                 */
                LaminatingModel.prototype._Compute_units = function (process) {
                    ////////
                    // 각 용지 종류별로, 사용한 면의 수를 계산함
                    ////////
                    // 각 조판면 및 그에 대한 (조정된) 판면수.
                    var face_counts = this.computeFaceCounts(process);
                    // 용지별 면수를 담은 HashMap
                    var units = new std.HashMap();
                    for (var i = 0; i < face_counts.size(); i++) {
                        // Element, Pair of Placement object and its face count.
                        var pair = face_counts.at(i);
                        var placement = pair.first; // 조판 배치 정보
                        var face_count = pair.second * placement.copy_count(); // 판면수 x 사본수량
                        var my_paper = placement.getPaperSize(); // 기준 PaperSize -> key 값
                        // 현재의 종이 크기가 이미 기록되었는가
                        var it = units.find(my_paper);
                        if (it.equals(units.end()) == true)
                            units.insert(std.make_pair(my_paper, face_count));
                        else
                            it.second += face_count;
                    }
                    return units;
                };
                /**
                 * 기본가격을 계산함.
                 *
                 * @param process 접지행위자
                 * @return 기본가격
                 */
                LaminatingModel.prototype._Compute_base_price = function (process) {
                    // 기본가격 X 유닛 수
                    return this.basePrice * this._Compute_units(process).size();
                };
                /**
                 * 기본요금구간을 벗어난, 추가비용을 계산한다.
                 *
                 * @param process 접지행위자.
                 * @return 초과요금
                 */
                LaminatingModel.prototype._Compute_over_price = function (process) {
                    // 추가 비용 = 필름가 X 추가면적 (m²)
                    return this.filmPrice * (this._Compute_over_area(process) / 1000 / 1000);
                };
                /**
                 * 기본요금구간 면수를 벗어난, 초과면의 면적을 계산한다.
                 *
                 * @param process 접지행위자
                 * @return 초과면적 총합
                 */
                LaminatingModel.prototype._Compute_over_area = function (process) {
                    ////////
                    // 초과 면적을 계산한다
                    ////////
                    var over_area = 0.0; // 초과 면적
                    var units = this._Compute_units(process); // 각 크기당 사용 면수
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
                        var over_faces = Math.max(0, it.second - this.baseFaces);
                        over_area += over_faces * it.first.computeArea();
                    }
                    return over_area;
                };
                /**
                 * @inheritdoc
                 */
                LaminatingModel.prototype.computeSpareArea = function (process) {
                    if (this.isUsed() == false)
                        return 0;
                    var area = 0.0;
                    // 용지별 면수를 담은 HashMap
                    var units = this._Compute_units(process);
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
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
                LaminatingModel.prototype.toGridRows = function (process) {
                    if (this.isUsed() == false)
                        return [];
                    var rows = [
                        ////////
                        // 합계
                        ////////
                        {
                            name: "라미네이팅",
                            price: this.computePrice(process),
                            comment: "라미네이팅비 = 기본요금 + 추가 필름비"
                        },
                        ////////
                        // 작업비
                        ////////
                        {
                            name: "\t작업비",
                            sub_price: this._Compute_base_price(process),
                            comment: "동일 면적의 용지당 " + core.library.StringUtil.numberFormat(this.baseFaces) + " 면까지"
                        },
                        {
                            name: "\t\t기본요금",
                            comment: core.library.StringUtil.numberFormat(this.basePrice) + " 원"
                        },
                        {
                            name: "\t\t사용된 용지 크기",
                            comment: core.library.StringUtil.numberFormat(this._Compute_units(process).size()) + " 종류"
                        },
                        ////////
                        // 코팅비
                        ////////
                        {
                            name: "\t추가 필름비",
                            sub_price: this._Compute_over_price(process),
                            comment: "초과면적 / 종이면 면적당가격 (m²)"
                        },
                        {
                            name: "\t\t초과면적",
                            comment: core.library.StringUtil.numberFormat(this._Compute_over_area(process) / 1000 / 1000) + " m²"
                        }
                    ].concat(this._ToGridRows_area(process), [
                        {
                            name: "\t\t1m² 당 가격",
                            comment: core.library.StringUtil.numberFormat(this.filmPrice) + " 원 / m²"
                        }
                    ], this.toGridRows_sparePapers(process));
                    return rows;
                };
                LaminatingModel.prototype._ToGridRows_area = function (process) {
                    var units = this._Compute_units(process);
                    var rows = [];
                    var i = 0;
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next()) {
                        if (it.second <= this.baseFaces)
                            continue;
                        var row = {
                            name: core.library.StringUtil.substitute("\t\t\t{1}. {2} x {3}", ++i, core.library.StringUtil.numberFormat(it.first.getWidth()), core.library.StringUtil.numberFormat(it.first.getHeight())),
                            comment: core.library.StringUtil.substitute("초과 {1} 면 -> {2} m²", core.library.StringUtil.numberFormat(it.second - this.baseFaces), core.library.StringUtil.numberFormat(it.first.computeArea() * (it.second - this.baseFaces) / 1000 / 1000))
                        };
                        rows.push(row);
                    }
                    return rows;
                };
                LaminatingModel.prototype.toGridRows_sparePapers = function (process) {
                    var rows = _super.prototype.toGridRows_sparePapers.call(this, process);
                    rows.splice(1);
                    var units = this._Compute_units(process);
                    var i = 0;
                    for (var it = units.begin(); !it.equals(units.end()); it = it.next())
                        rows.push({
                            name: core.library.StringUtil.substitute("\t\t{1}. {2} x {3}", ++i, it.first.getWidth(), it.first.getHeight()),
                            comment: core.library.StringUtil.substitute("x {1} 여분지 장 = {4} m^2", this.sparePapers, core.library.StringUtil.numberFormat(it.first.computeArea() * this.sparePapers / 1000 / 1000))
                        });
                    return rows;
                };
                return LaminatingModel;
            }(core.SideOptionalModel));
            core.LaminatingModel = LaminatingModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                function PriceModels() {
                    var _this = _super.call(this) || this;
                    _this.print = new core.PrintModel();
                    _this.foil = new core.FoilModel();
                    _this.scodix = new core.ScodixModel();
                    _this.thomson = new core.ThomsonModel();
                    _this.laminating = new core.LaminatingModel();
                    _this.init();
                    return _this;
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
                PriceModels.prototype.computePrice = function (process) {
                    // 용지 사용가격을 시작으로 하여
                    var price = process.getPaper().computePrice(process);
                    // 재단 가격을 더하고
                    price += process.getProcessArray().getCutter().computePrice(process);
                    // 기타 공정에 대한 모든 소요가격을 합산한다
                    var options = [this.print, this.foil, this.scodix, this.thomson, this.laminating];
                    for (var i = 0; i < options.length; i++)
                        if (options[i].isUsed() == true)
                            price += options[i].computePrice(process);
                    return price;
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
                PriceModels.prototype.toGridRows = function (process) {
                    var rows = [
                        { name: "총합", price: process.computePrice() }
                    ].concat(process.getPaper().toGridRows(process), process.getProcessArray().getCutter().toGridRows(process), this.print.toGridRows(process), this.foil.toGridRows(process), this.scodix.toGridRows(process), this.thomson.toGridRows(process), this.laminating.toGridRows(process) // 라미네이팅 모형
                    );
                    return rows;
                };
                return PriceModels;
            }(core.protocol.Entity));
            core.PriceModels = PriceModels;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    return _super.apply(this, arguments) || this;
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
                    this.side = core.Initial.SIDE;
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
                PrintModel.prototype.computePrice = function (process) {
                    if (this.isUsed() == false)
                        return 0;
                    // 인쇄비 = 작업비 + CTP 출력비
                    return this._Compute_work_price(process) + this._Compute_ctp_price(process);
                };
                /**
                 * 작업비용 계산.
                 */
                PrintModel.prototype._Compute_work_price = function (process) {
                    // 작업비용 = (단위당 비용 x 단위수) x 색상도수
                    return (this.workPrice * this._Compute_units(process))
                        * this._Compute_weighted_average_color_degree(process); // 가중평균된 색상도수
                };
                /**
                 * CTP 가격 계산.
                 */
                PrintModel.prototype._Compute_ctp_price = function (process) {
                    ////////
                    // CTP 비용 = CTP 가격 X 판면수 X 색상도수
                    ////////
                    // 도장을 찍는 것과 같아, 부수와는 관계 없다
                    // 오로지 판 수에만 영향을 받는다
                    return this.ctpPrice * process.computeFaceCount() * this._Compute_weighted_average_color_degree(process);
                };
                /**
                 * 단위 수를 계산함.
                 *
                 * @param process 접지행위자
                 * @return 단위 수
                 */
                PrintModel.prototype._Compute_units = function (process) {
                    // 각 면마다 별개의 작업 (유닛) 으로 친다
                    // 각 면마다, 사본 수량만큼 찍게 되는데, 이 때 사본의 수량이 각 면의 작업 유닛 수를 결정함
                    var units = 0;
                    for (var i = 0; i < process.size(); i++) {
                        var placement = process.at(i);
                        units += placement.face_count() * Math.ceil(placement.copy_count() / this.workFaces);
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
                 * @param process 접지행위자
                 * @return 색상도수의 가중평균
                 */
                PrintModel.prototype._Compute_weighted_average_color_degree = function (process) {
                    if (this.side == core.Side.SINGLE) {
                        // 단면일 때, 앞면의 색상도수가 곧 평균 도수이다
                        return this.frontSideColorCode.length;
                    }
                    else if (process.getDevice().isFolding() == true) {
                        // 접지시, 앞뒷면이 혼재되어 배치되기에,
                        // 색상코드의 교집합을 도수로 사용한다
                        return this._Compute_intersect_color_degree();
                    }
                    else {
                        var face_count = process.computeFaceCount();
                        var color_codes = 0;
                        var is_front = true;
                        for (var i = 0; i < process.size(); i++) {
                            var placement = process.at(i);
                            // 각각 양-단면일 때의 색상도수를 가중하여 더함
                            // 단 이 때, 최후의 홀수 페이지는 제하고, 그 이전의 짝수 페이지까지에 대해서만 계산한다
                            color_codes += Math.floor(placement.face_count() / 2) * this.frontSideColorCode.length;
                            color_codes += Math.floor(placement.face_count() / 2) * this.backSideColorCode.length;
                            if (placement.face_count() % 2 == 1)
                                if (placement.inverse_count() > 1) {
                                    // 돈땡이 행해진 경우에, 앞뒷면을 한 판면에 같이 찍기 때문에
                                    // 색상코드의 합집합을 적용시켜야 한다.
                                    color_codes += this._Compute_intersect_color_degree();
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
                PrintModel.prototype._Compute_intersect_color_degree = function () {
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
                PrintModel.prototype.toGridRows = function (process) {
                    if (this.isUsed() == false)
                        return [];
                    var rows = [
                        ////////
                        // 합계
                        ////////
                        {
                            name: "인쇄",
                            price: this.computePrice(process),
                            comment: "인쇄비 = 작업비 + CTP 출력비"
                        },
                        ////////
                        // 작업비
                        ////////
                        {
                            name: "\t작업비",
                            sub_price: this._Compute_work_price(process),
                            comment: "작업비 = 작업단위 X 단위당작업비 X 도수"
                        },
                        {
                            name: "\t\t작업단위",
                            comment: core.library.StringUtil.substitute("{1} 판면 X 올림({2} 부 / {3} 판면) = {4} 단위", core.library.StringUtil.numberFormat(process.computeFaceCount()), core.library.StringUtil.numberFormat(process.getImage().getCopies()), core.library.StringUtil.numberFormat(this.workFaces), core.library.StringUtil.numberFormat(this._Compute_units(process)))
                        },
                        {
                            name: "\t\t단위당 작업비",
                            comment: core.library.StringUtil.numberFormat(this.workPrice) + " 원"
                        }
                    ].concat(this._ToGridRows_units(process), [
                        {
                            name: "\t\t색상코드",
                            comment: this.side == 1
                                ? this.frontSideColorCode
                                : core.library.StringUtil.substitute("{1} (#{2}), {3} (#{4})", this.frontSideColorCode, this.frontSideColorCode.length, this.backSideColorCode, this.backSideColorCode.length)
                        },
                        ////////
                        // CTP 출력비
                        ////////
                        {
                            name: "\tCTP 출력비",
                            sub_price: this._Compute_ctp_price(process),
                            comment: "CTP 출력비 = 판면수 X 도수 X 도가격"
                        },
                        {
                            name: "\t\t판면수",
                            comment: core.library.StringUtil.numberFormat(process.computeFaceCount()) + " 판면"
                        },
                        {
                            name: "\t\t색상코드",
                            comment: this.side == 1
                                ? this.frontSideColorCode
                                : core.library.StringUtil.substitute("{1} (#{2}), {3} (#{4})", this.frontSideColorCode, this.frontSideColorCode.length, this.backSideColorCode, this.backSideColorCode.length)
                        },
                        {
                            name: "\t\t도가격",
                            comment: core.library.StringUtil.numberFormat(this.ctpPrice) + " 원 / 도"
                        }
                    ], this.toGridRows_sparePapers(process));
                    return rows;
                };
                PrintModel.prototype._ToGridRows_units = function (process) {
                    var rows = [];
                    for (var i = 0; i < process.size(); i++) {
                        var placement = process.at(i);
                        var units = placement.face_count() * Math.ceil(placement.copy_count() / this.workFaces);
                        var row = {
                            name: core.library.StringUtil.substitute("\t\t\t{1}. {2} x {3}", i + 1, core.library.StringUtil.numberFormat(placement.getPaperSize().getWidth()), core.library.StringUtil.numberFormat(placement.getPaperSize().getHeight())),
                            comment: core.library.StringUtil.substitute("{1} 판면, {2} -> {3} 단위", core.library.StringUtil.numberFormat(placement.face_count()), placement.$copies, 
                            //library.StringUtil.numberFormat(placement.computeCopies()),
                            core.library.StringUtil.numberFormat(units))
                        };
                        rows.push(row);
                    }
                    return rows;
                };
                return PrintModel;
            }(core.SideOptionalModel));
            core.PrintModel = PrintModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
/// <reference path="SideOptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * <p> 스코딕스 모형. </p>
             *
             * <ol>
             *	<li> 피딩비: 회당 300 원 </li>
             *	<li> 한 판 잉크비: 15 원 / cm<sup>2</sup> </li>
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
                    return _super.apply(this, arguments) || this;
                }
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                // using super::constructor
                /**
                 * @inheritdoc
                 */
                ScodixModel.prototype.init = function () {
                    // BASIC MEBMERS
                    this.used = false;
                    this.side = 2;
                    this.sparePapers = 30;
                    // SPECIFIED MEMBERS
                    this.feedingPrice = 230;
                    this.inkPrice = 15;
                    // TEMPORARY MEMBER
                    this.inkAreaPercentage = 7;
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
                ScodixModel.prototype.computePrice = function (process) {
                    if (this.isUsed() == false)
                        return 0;
                    return this._Compute_feeding_price(process) + this._Compute_ink_price(process);
                };
                ScodixModel.prototype._Compute_feeding_price = function (process) {
                    // 230원 x 피딩 횟수
                    return this.feedingPrice * this._Compute_feeding_count(process);
                };
                ScodixModel.prototype._Compute_feeding_count = function (process) {
                    // 각 조판면 및 그에 대한 (조정된) 판면수.
                    var face_counts = this.computeFaceCounts(process);
                    // 피딩횟수 총합
                    var count = 0;
                    for (var i = 0; i < face_counts.size(); i++) {
                        // 조판면과 판면수의 Pair
                        var pair = face_counts.at(i);
                        var placement = pair.first;
                        var face_count = pair.second;
                        // (조정된) 판면수 x (조정된) 부수
                        count += face_count * placement.copy_count();
                    }
                    return count;
                };
                ScodixModel.prototype._Compute_ink_price = function (process) {
                    var DENOMINATOR_SCALE = 297 * 420 * .01; // A3 1% 면적
                    var area = this._Compute_ink_area(process);
                    // 15 원 / A3 1% 면적
                    return (area / DENOMINATOR_SCALE) * this.inkPrice;
                };
                ScodixModel.prototype._Compute_ink_area = function (process) {
                    var image = process.getImage();
                    var pages = process.getImage().getPages();
                    // 스코딕스와 인쇄의 양단면 코드가 다를 경우
                    if (this.side != process.computeSide())
                        if (this.side == 1)
                            pages = Math.ceil(pages / 2); // 페이지 수는 절반으로 준다
                        else
                            pages = pages * 2; // 페이지 수는 2배로 뛴다
                    // 이미지 당 면적
                    var area = image.computeArea() * (this.inkAreaPercentage / 100.0);
                    area *= pages; // x 페이지 수
                    area *= image.getCopies(); // x 사본 수량
                    return area;
                };
                /* ---------------------------------------------------------
                    GETTERS
                --------------------------------------------------------- */
                ScodixModel.prototype.getFeedingPrice = function () {
                    return this.feedingPrice;
                };
                ScodixModel.prototype.getInkPrice = function () {
                    return this.inkPrice;
                };
                ScodixModel.prototype.$getInkAreaPercentage = function () {
                    return this.inkAreaPercentage;
                };
                /* ---------------------------------------------------------
                    SETTERS
                --------------------------------------------------------- */
                ScodixModel.prototype.setFeedingPrice = function (val) {
                    this.feedingPrice = val;
                };
                ScodixModel.prototype.setInkPrice = function (val) {
                    this.inkPrice = val;
                };
                ScodixModel.prototype.$setInkAreaPercentage = function (val) {
                    this.inkAreaPercentage = val;
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
                ScodixModel.prototype.toGridRows = function (process) {
                    if (this.isUsed() == false)
                        return [];
                    var image = process.getImage();
                    var rows = [
                        ////////
                        // 합계
                        ////////
                        {
                            name: "스코딕스",
                            price: this.computePrice(process),
                            comment: "스코딕스비 = 피딩비 + 잉크비"
                        },
                        ////////
                        // 작업비
                        ////////
                        {
                            name: "\t피딩비",
                            sub_price: this._Compute_feeding_price(process),
                            comment: "피딩비 = 회당 피딩비 X 피딩 횟수"
                        },
                        {
                            name: "\t\t회당 피딩비",
                            comment: core.library.StringUtil.numberFormat(this.feedingPrice) + " 원 / 회"
                        },
                        {
                            name: "\t\t피딩 횟수",
                            comment: core.library.StringUtil.numberFormat(this._Compute_feeding_count(process)) + " 회"
                        },
                        ////////
                        // 잉크비
                        ////////
                        {
                            name: "\t잉크비",
                            sub_price: this._Compute_ink_price(process),
                            comment: "잉크비 = 총 면적 X 단위면적당 가격"
                        },
                        {
                            name: "\t\t잉크 면적",
                            comment: core.library.StringUtil.substitute("{1} cm² X {2} 부 = {3} cm²", core.library.StringUtil.numberFormat((image.computeArea() / 100.0) * (this.inkAreaPercentage / 100.0) * image.getPages()), core.library.StringUtil.numberFormat(image.getCopies()), core.library.StringUtil.numberFormat(this._Compute_ink_area(process) / 100.0))
                        },
                        {
                            name: "\t\t단위면적가",
                            comment: core.library.StringUtil.numberFormat(this.inkPrice)
                                + " 원 / 12.474 cm² (A3 1% 면적)"
                        }
                    ].concat(this.toGridRows_sparePapers(process));
                    return rows;
                };
                return ScodixModel;
            }(core.SideOptionalModel));
            core.ScodixModel = ScodixModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="../API.ts" />
/// <reference path="OptionalModel.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
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
                    return _super.apply(this, arguments) || this;
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
                    this.cuttingLength = 50;
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
                ThomsonModel.prototype.computePrice = function (process) {
                    if (this.isUsed() == false)
                        return 0;
                    // 톰슨 가격 = 기본작업비 + 추가작업비 + 칼비
                    return this._Compute_base_work_price(process)
                        + this._Compute_over_work_price(process)
                        + this._Compute_cutting_price(process);
                };
                ThomsonModel.prototype._Compute_base_work_price = function (process) {
                    return this._Compute_face_count(process) * this.workBasePrice;
                };
                ThomsonModel.prototype._Compute_face_count = function (process) {
                    var count_pairs = this.computeFaceCounts(process);
                    var face_count = 0;
                    for (var i = 0; i < count_pairs.size(); i++)
                        face_count += count_pairs.at(i).second;
                    return face_count;
                };
                ThomsonModel.prototype._Compute_over_work_price = function (process) {
                    return this._Compute_over_faces(process) * this.workOverPrice;
                };
                ThomsonModel.prototype._Compute_over_faces = function (process) {
                    // 초과면수 총합
                    var ret = 0;
                    // 각 조판면 및 그에 대한 (조정된) 판면수.
                    var count_pairs = this.computeFaceCounts(process);
                    for (var i = 0; i < count_pairs.size(); i++) {
                        var pair = count_pairs.at(i);
                        // 현 판면의 사본수 - 기준치
                        var my_over_faces = pair.first.copy_count() - this.workBaseFaces;
                        if (my_over_faces <= 0)
                            continue; // 기준치 미달
                        my_over_faces *= pair.second; // 판면 수를 고하여
                        ret += my_over_faces; // 총합에 더함
                    }
                    return ret;
                };
                ThomsonModel.prototype._Compute_cutting_price = function (process) {
                    // 5,000원 / m
                    // 현재 길이 및 복잡도를 특정할 방법이 없음, 임시변수를 사용
                    return this.cuttingPrice * this.cuttingLength;
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
                    return this.cuttingLength;
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
                    this.cuttingLength = val;
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
                ThomsonModel.prototype.toGridRows = function (process) {
                    if (this.isUsed() == false)
                        return [];
                    var faces = process.computeFaceCount() * process.getImage().getCopies();
                    var stair_price = this.workBasePrice * Math.floor(faces / this.workBaseFaces);
                    var surplus_price = this.workOverPrice * (faces % this.workBaseFaces);
                    var rows = [
                        ////////
                        // 합계
                        ////////
                        {
                            name: "톰슨",
                            price: this.computePrice(process),
                            comment: "톰슨비 = 기본작업비 + 추가작업비 + 칼비"
                        },
                        ////////
                        // 작업비
                        ////////
                        {
                            name: "\t기본 작업비",
                            sub_price: this._Compute_base_work_price(process),
                            comment: core.library.StringUtil.substitute("총 {1} 판면 x {2} 원 / 판면", core.library.StringUtil.numberFormat(this._Compute_face_count(process)), core.library.StringUtil.numberFormat(this.workBasePrice))
                        },
                        {
                            name: "\t추가 작업비",
                            sub_price: this._Compute_over_work_price(process),
                            comment: core.library.StringUtil.substitute("{1} 판면부터 {2} 원씩, 총 {3} 판면 초과", core.library.StringUtil.numberFormat(this.workBaseFaces), core.library.StringUtil.numberFormat(this.workOverPrice), core.library.StringUtil.numberFormat(this._Compute_over_faces(process)))
                        }
                    ].concat(this._ToGridRows_units(process), [
                        ////////
                        // 칼비
                        ////////
                        {
                            name: "\t칼비",
                            sub_price: this._Compute_cutting_price(process),
                            comment: core.library.StringUtil.numberFormat(this.cuttingPrice) + " 원 / m"
                        },
                        {
                            name: "\t\t칼 길이",
                            comment: core.library.StringUtil.numberFormat(this.cuttingLength) + " m"
                        }
                    ], this.toGridRows_sparePapers(process));
                    return rows;
                };
                ThomsonModel.prototype._ToGridRows_units = function (process) {
                    var rows = [];
                    var count_pairs = this.computeFaceCounts(process);
                    for (var i = 0; i < count_pairs.size(); i++) {
                        var pair = count_pairs.at(i);
                        var placement = pair.first;
                        var face_count = pair.second;
                        if (placement.copy_count() <= this.workBaseFaces)
                            continue;
                        var over_faces = face_count * (placement.copy_count() - this.workBaseFaces);
                        var over_price = over_faces * this.workOverPrice;
                        var row = {
                            name: core.library.StringUtil.substitute("\t\t{1}. {2} x {3}", i + 1, core.library.StringUtil.numberFormat(placement.getPaperSize().getWidth()), core.library.StringUtil.numberFormat(placement.getPaperSize().getHeight())),
                            comment: core.library.StringUtil.substitute("{1} 판면, {2} -> {3} 판면 초과", face_count, placement.$copies, core.library.StringUtil.numberFormat(over_faces))
                        };
                        rows.push(row);
                    }
                    return rows;
                };
                return ThomsonModel;
            }(core.OptionalModel));
            core.ThomsonModel = ThomsonModel;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * 공정 클래스.
             *
             * {@link Process} 는 개별 공정에 관한 모든 정보를 지니는 Facade 클래스이다.
             *
             * 현 공정이 사용하는 장비 Device 와, 조판에 사용될 Image 및 가격모형 PriceModels 객체를 직접 지닌다.
             * 더불어 조판 배치정보 Placement 객체들을 Composition 관계로 지니고 있다. 또한, 최적의 조판 배치를 탐색하는
             * 최적화 함수 {@link optimize optimize()} 또한 가지고 있다.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var Process = (function (_super) {
                __extends(Process, _super);
                function Process(arg) {
                    var _this = _super.call(this) || this;
                    if (arg instanceof Process) {
                        ////////
                        // COPY
                        ////////
                        var obj = arg;
                        // MEMBERS
                        _this.process_array_ = obj.process_array_;
                        _this.name = obj.name;
                        _this.device_ = obj.device_;
                        _this.image_ = obj.image_;
                        _this.paper_ = obj.paper_;
                        _this.price_models_ = obj.price_models_;
                        // ASIGN CHILDREN ELEMENTS
                        _this.assign(obj.begin(), obj.end());
                    }
                    else {
                        _this.process_array_ = arg;
                        _this.name = "이름 없음";
                        _this.device_ = new core.Device();
                        _this.image_ = new core.Image();
                        _this.price_models_ = new core.PriceModels();
                        _this.device_.init();
                        _this.image_.init();
                        _this.price_models_.init();
                        if (_this.process_array_.getPaperArray().empty() == true)
                            _this.paper_ = null;
                        else
                            _this.paper_ = _this.process_array_.getPaperArray().front();
                    }
                    return _this;
                }
                /**
                 * @inheritdoc
                 */
                Process.prototype.construct = function (xml) {
                    this.device_.construct(xml.get(this.device_.TAG()).front());
                    this.image_.construct(xml.get(this.image_.TAG()).front());
                    this.price_models_.construct(xml.get(this.price_models_.TAG()).front());
                    if (xml.hasProperty("paper") == true) {
                        var paper_name = xml.getProperty("paper");
                        if (this.process_array_.getPaperArray().has(paper_name) == true)
                            this.paper_ = this.process_array_.getPaperArray().get(paper_name);
                        else
                            this.paper_ = null;
                    }
                    else
                        this.paper_ = null;
                    _super.prototype.construct.call(this, xml);
                };
                /**
                 * @inheritdoc
                 */
                Process.prototype.createChild = function (xml) {
                    return new core.Placement(this);
                };
                /**
                 * @hidden
                 */
                Process.prototype._Create_virtual_paper_size = function (pages) {
                    // image size: 50, 90
                    // margin: 5
                    // non printable: 2 5
                    // bite: 3 0
                    // res
                    // 1: 117 83
                    // 2: 200 150
                    // 4: 468 332 ?
                    // 가로가 짧고, 세로가 긴 이미지로 변환
                    var image_width = this.image_.getWidth();
                    var image_height = this.image_.getHeight();
                    {
                        if (image_width > image_height)
                            _a = [image_height, image_width], image_width = _a[0], image_height = _a[1];
                    }
                    var image_margin = this.image_.getMargin();
                    // 결과 도출
                    var width;
                    var height;
                    if (pages == 1) {
                        // 단일 페이지, 여백을 고려한다.
                        // []
                        width = image_width + 2 * image_margin;
                        height = image_height + 2 * image_margin;
                    }
                    else if (pages == 2) {
                        // 두 페이지를 모아 조판
                        // [] | []
                        width = 2 * image_width + 4 * image_margin; // 4 번의 여백
                        height = image_height + 2 * image_margin; // 2 번의 여백
                    }
                    else {
                        // 위 아래 두 페이지씩
                        // [] | []
                        // ---|----
                        // [] | []
                        width = 2 * image_width + 4 * image_margin; // 4 번의 여백
                        height = 2 * image_height + 4 * image_margin; // 4 번의 여백
                    }
                    // 인쇄 불가능 영역을 가산함
                    var non_printable = Math.max(this.device_.getNonPrintableWidth(), this.device_.getNonPrintableHeight());
                    width += 2 * non_printable + this.device_.getBiteLength();
                    height += 2 * non_printable + this.device_.getBiteLength();
                    return new core.PaperSize(width, height);
                    var _a;
                };
                /* ---------------------------------------------------------
                    OPTIMIZER
                --------------------------------------------------------- */
                /**
                 * 최적화를 행함.
                 *
                 * 다양한 배치안을 시도하여, 최적의 조판면 배치안을 찾아낸다. {@link optimize} 가 호출된 후,
                 * 현재의 {@link Process} 객체는 최적의 조판면 {@link Placement} 객체들을 자식으로 채워지게 된다.
                 *
                 * 최적화는 다음과 같은 순서로 행해진다.
                 * - 최적의 공간활용률을 보이는 조판면 리스트를 산출
                 * - 다음 과정을 반복
                 *	- 남은 페이지를 담을 수 있는, 가장 큰 조판을 사용하여 배치를 수행
                 *		- 나누어 떨어지어, 더 이상 남은 페이지가 없는 경우, 탐색을 종료
                 *		- 나누어 떨어지지 않아, 남은 페이지가 발생
                 *			- 올림하여 조판.
                 *			- 남은 페이지에 대하여 첫 과정으로 돌아감 (추가 탐색)
                 *	- 위의 전 과정에서, 상시로 대안 탐색. 위 과정에 의해 탐색이 종료되어도, 아래의 대안 탐색은 계속 이루어진다.
                 *		- 양면 조판이며 홀수 개의 조판면을 가질 때, 마지막 판면을 차감한 후, 추가 탐색
                 *		- 판걸이 탐색
                 *		- 돈땡 탐색
                 *			- 양면 조판일 때만 가능
                 *			- 돈땡 탐색 후에 판걸이 탐색을 추가적으로 행함
                 *
                 * 최적화가 끝난 후, 산출된 최적의 조판을 대표하는 {@link Placement} 객체들은, 현 객체
                 * {@link Process} 의 자식으로 할당된다.
                 */
                Process.prototype.optimize = function () {
                    /////
                    // 초기값 도출
                    /////
                    // 기존의 모든 조판내역을 지움
                    this.clear();
                    // 최적의 배치후보자 및 양단면 코드와 페이지 수
                    var placements = this._Compute_placements();
                    var side = this.computeSide();
                    var total_pages = this.getImage().getPages();
                    /////
                    // 최적 배치 도출
                    /////
                    // 탐색
                    var process = this._Explore_placements(placements, side, total_pages);
                    // 도출된 최적 배치 리스트를 현재의 Folder에 할당한다
                    this.assign(process.begin(), process.end());
                };
                /**
                 * @hidden
                 */
                Process.prototype._Explore_placements = function (placements, side, left_pages, first) {
                    if (first === void 0) { first = null; }
                    //--------
                    // 최적의 배치를 탐색함.
                    // 
                    // 최적화는 다음과 같은 순서로 행해진다.
                    // - 최적의 공간활용률을 보이는 조판면 리스트를 산출
                    // - 다음 과정을 반복
                    //	- 남은 페이지를 담을 수 있는, 가장 큰 조판을 사용하여 배치를 수행
                    //		- 나누어 떨어지어, 더 이상 남은 페이지가 없는 경우, 탐색을 종료
                    //		- 나누어 떨어지지 않아, 남은 페이지가 발생
                    //			- 올림하여 조판.
                    //			- 남은 페이지에 대하여 첫 과정으로 돌아감 (추가 탐색)
                    //	- 위의 전 과정에서, 상시로 대안 탐색. 위 과정에 의해 탐색이 종료되어도, 아래의 대안 탐색은 계속 이루어진다.
                    //		- 양면 조판이며 홀수 개의 조판면을 가질 때, 마지막 판면을 차감한 후, 추가 탐색
                    //		- 판걸이 탐색
                    //		- 돈땡 탐색
                    //			- 양면 조판일 때만 가능
                    //			- 돈땡 탐색 후에 판걸이 탐색을 추가적으로 행함
                    // 
                    // 위 과정이 한 차례 돌 때마다 새로운 (복제된) {@link Process} 객체가 생성되고, 
                    // 이렇게 새로 생겨난 {@link Process} 객체가 다음 과정의 최적화를 수행하게 된다.
                    // 
                    // @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
                    // @param side 양단면 코드
                    // @param left_pages 배치가 완료되지 않은 잔여 페이지
                    // @param first 탐색을 시작할 첫 조편만의 반복자 (탐색범위 내 가장 큰 조판)
                    // 
                    // @return 최소비용을 지니는 {@link Process} 객체
                    //--------
                    // 모든 페이지의 배치가 끝낫다.
                    if (left_pages == 0)
                        return this;
                    // 안전장치 - 0개의 이미지를 지니는 판면 제거
                    this._Erase_empty_placements();
                    //========
                    // 가능한 판 배치 중, 최소 비용을 찾는다 -> 즉, 모든 iteration을 다 돌아봐야 함을 의미
                    //========
                    var candidate_solutions = new std.Vector();
                    if (first == null)
                        first = placements.lower_bound(left_pages); // 사용 가능한 최대 크기
                    // 가능한 모든 배치 후보군 中에서...
                    for (var it = first; !it.equals(placements.end()); it = it.next()) {
                        var quota = left_pages / it.second.max_image_count();
                        var face_count = Math.floor(quota);
                        if (quota == face_count) {
                            //--------
                            // 나누어 떨어짐. 현재의 판에 모두 조판 가능
                            //--------
                            // 현재의 배치방법대로 조판 모형을 생성하고, 부수를 설정함
                            var placement = new core.Placement(it.second);
                            placement.allocate(placement.max_image_count(), face_count);
                            // 현재의 조판 모형을 추가
                            var my_solution = new Process(this);
                            my_solution.push_back(placement);
                            // 후보안 추가 - 현 조판안 + 판걸이
                            candidate_solutions.push_back(my_solution);
                            candidate_solutions.push_back(my_solution._Explore_plaste_placements(placements, side, 0));
                            // 양면 조판에 홀수 판면수가 나오는 경우, 대안을 사용한다. 
                            //	- 대안 탐색이 아닌 대치
                            //	- 대안 또한 유효성 검증을 거쳐 통과해야 함
                            if (my_solution._Validate_optimization() == false) {
                                // 대안 도출
                                //	1. 차감 후 추가 탐색
                                //	2. 돈땡
                                candidate_solutions.push(my_solution._Explore_subtract_placements(placements, 0), my_solution._Explore_inverse_placements(placements, 0));
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
                            var placement = new core.Placement(it.second);
                            placement.allocate(placement.max_image_count(), face_count);
                            // 현재의 조판 모형을 추가
                            var pre_solution = new Process(this);
                            pre_solution.push_back(placement);
                            // 판걸이를 행한 조판을 후보군에 등록
                            if (placement.max_image_count() < 8)
                                candidate_solutions.push_back(pre_solution._Explore_plaste_placements(placements, side, remainder));
                            /////
                            // 첫째, 올림하여 빈 공간이 생기는 걸 감수하고 배치하는 경우
                            /////
                            var ceiled_solution = new Process(pre_solution);
                            {
                                if (remainder == it.second.max_image_count() - 1) {
                                    //--------
                                    // 나머지가 최대 배치가능 이미지 - 1 (ex: 7 = 8 - 1)
                                    //	- 나머지 조판면 하나만 추가하면 된다.
                                    //--------
                                    // 마지막 조판에 대한 사본으로 대치
                                    // 복사 생성자로 인한 불필요한 Link가 남는 것을 막기 위함이다
                                    var last_placement = ceiled_solution.back();
                                    ceiled_solution.pop_back();
                                    ceiled_solution.push_back(new core.Placement(last_placement));
                                    // 여백을 인정하는 나머지 조판을 행하고
                                    var reminader_placement = new core.Placement(it.second);
                                    reminader_placement.allocate(remainder, 1);
                                    // 이전 조판과 현재의 나머지 조판 사이에 종속관계를 맺어준다
                                    ceiled_solution.back()._Set_dependency(reminader_placement);
                                    reminader_placement._Set_dependent(ceiled_solution.back());
                                    // 그 후 올림 솔루션에 추가
                                    ceiled_solution.push(reminader_placement);
                                }
                                else {
                                    //--------
                                    // 나머지가 최대 배치가믕 이미지보다 작다 (ex: 5 < 8 - 1)
                                    //	- 이전의 마지막 조판면도 판면수를 하나 차감하고
                                    //	- 나머지 조판면 둘을 생성해내야 함
                                    //--------
                                    // 마지막 조판에 대한 사본으로 대치 혹은 삭제
                                    // 복사 생성자로 인한 불필요한 Link가 남는 것을 막기 위함
                                    var last_placement = ceiled_solution.back(); // 마지막 조판면을
                                    var replace_placement = new core.Placement(last_placement); // 복제한다; 대체 조판면
                                    replace_placement._Subtract_face_count(); // 그리고 판면수를 하나 차감한다.
                                    // 마지막 조판면을 지우고
                                    ceiled_solution.pop_back();
                                    if (replace_placement.face_count() != 0)
                                        ceiled_solution.push_back(replace_placement); // 대체 조판면을 삽입
                                    //--------
                                    // 나머지 두 판면을 구성
                                    //--------
                                    var remainder_first_placement = new core.Placement(it.second);
                                    var remainder_second_placement = new core.Placement(it.second);
                                    // 나머지가 5였던 경우 -> 8 + 5 = 13 -> 7 and 6
                                    var undivded_remainders = it.second.max_image_count() + remainder;
                                    remainder_first_placement.allocate(Math.ceil(undivded_remainders / 2), 1); // 올림 배치
                                    remainder_second_placement.allocate(Math.floor(undivded_remainders / 2), 1); // 내림 배치
                                    // 종속 관계를 맺고,
                                    remainder_first_placement._Set_dependency(remainder_second_placement);
                                    remainder_second_placement._Set_dependent(remainder_first_placement);
                                    // 올림 솔루션에 추가
                                    ceiled_solution.push(remainder_first_placement, remainder_second_placement);
                                }
                                // 올림 솔루션을 후보 솔루션군에 추가
                                candidate_solutions.push(ceiled_solution);
                                //--------
                                // 대안 탐색
                                //	- 돈땡은 불가 -> 양면에서의 나머지 조판이 이루어졌다는 것은, 곧 짝수 판면수라는 의미
                                //	- 판걸이 가능 -> 단, 마지막 조편면 뿐 아니라 그에 연관 조판면 모두 동시에 판걸이가 행해지게 된다
                                //--------
                                candidate_solutions.push_back(ceiled_solution._Explore_plaste_placements(placements, side, 0));
                            }
                            /////
                            // 둘째, 나머지는 다른 종류의 판으로 싸는 경우; 계속 탐색을 수행함
                            /////
                            var explored_solution = pre_solution._Explore_placements(placements, side, remainder);
                            {
                                // 나머지 탐색 솔루션도 후보 솔루션군에 추가함
                                candidate_solutions.push(explored_solution);
                                if (side == 2)
                                    candidate_solutions.push(pre_solution._Explore_subtract_placements(placements, remainder), pre_solution._Explore_inverse_placements(placements, remainder));
                            }
                        }
                    }
                    //========
                    // 후보군 중 최소 비용을 찾음
                    //========
                    var best = null;
                    for (var i = 0; i < candidate_solutions.size(); i++) {
                        if (candidate_solutions.at(i) == null)
                            continue;
                        // 안전장치 - 0개의 이미지를 지니는 판면 제거
                        candidate_solutions.at(i)._Erase_empty_placements();
                        console.log(candidate_solutions.at(i).computePrice());
                        // 양면조판의 경우, 유효하지 않은 배치가 생길 수 있다.
                        if (candidate_solutions.at(i)._Validate_optimization() == false)
                            continue;
                        if (best == null || candidate_solutions.at(i).computePrice() < best.computePrice())
                            best = candidate_solutions.at(i);
                    }
                    // 최적 조판안 리턴
                    return best;
                };
                /**
                 * @hidden
                 */
                Process.prototype._Explore_subtract_placements = function (placements, left_pages) {
                    //--------
                    // 홀수 판면을 제거하고 더 작은 단위로 분할하는 대안을 찾음.
                    // 
                    // @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
                    // @param left_pages 배치가 완료되지 않은 잔여 페이지
                    //
                    // @return 최소비용을 지니는 {@link Process} 객체.
                    //--------
                    // 아무 조판도 이루어지지 않은 경우
                    if (this.empty() == true)
                        return null;
                    var last_placement = this.back();
                    // 조판 수가 짝수거나, 홀수더라도 가장 작은 조판에 대하여 행한 것이라면, PASS
                    if (last_placement.face_count() % 2 == 0)
                        return null;
                    // 판수를 하나 차감하는 조판을 행한다
                    var alter_placement = new core.Placement(last_placement);
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
                    alter_solution = alter_solution._Explore_placements(placements, 2, alter_left_pages, alter_last_it.next());
                    if (alter_solution != null)
                        alter_solution._Erase_empty_placements();
                    return alter_solution;
                };
                /**
                 * @hidden
                 */
                Process.prototype._Explore_inverse_placements = function (placements, left_pages) {
                    //--------
                    // 대안 탐색 - 돈땡.
                    // 
                    // 돈땡이 가능한 지 검사하고, 가능시 기존의 조판을 돈땡으로 바꾼 후, 추가적인 탐색을 수행한다.
                    // 
                    // @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
                    // @param left_pages 배치가 완료되지 않은 잔여 페이지
                    //
                    // @return 최소비용을 지니는 {@link Process} 객체.
                    //--------
                    // 아직 아무런 조판도 이루어지지 않았거나, 양면이 아니라면, 돈땡을 행할 수 없다
                    if (this.empty() == true || this.computeSide() == 1)
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
                    var subtracted_placement = new core.Placement(last_placement);
                    subtracted_placement._Subtract_face_count();
                    // 돈땡을 행하는 판면(만)을 가지는 배치 수행
                    var inversed_placement = new core.Placement(last_placement);
                    inversed_placement._Set_face_count(1);
                    inversed_placement._Set_inverse_count(2);
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
                        plasted = plasted._Explore_plaste_placements(placements, 2, left_pages);
                    }
                    // 추가 탐색 수행
                    alternative = alternative._Explore_placements(placements, 2, left_pages);
                    // 돈땡 + 판걸이를 적용할 것인가
                    if (plasted != null && plasted._Validate_optimization() == true)
                        if (alternative == null || alternative._Validate_optimization() == false)
                            alternative = plasted;
                        else if (plasted.computePrice() < alternative.computePrice())
                            alternative = plasted;
                    return alternative;
                };
                /**
                 * @hidden
                 */
                Process.prototype._Explore_plaste_placements = function (placements, side, left_pages) {
                    //--------
                    // 대안 탐색 - 판걸이.
                    //
                    // 판걸이가 가능한 지 검사하고, 가능시 기존의 조판을 판걸이로 바꾼 후, 추가적인 탐색을 수행한다. 
                    //
                    // @param placements 배치가능 모형 중 각 수량별로 최대공간활용 모형만을 남긴 최적 리스트
                    // @param left_pages 배치가 완료되지 않은 잔여 페이지
                    // 
                    // @return 최소비용을 지니는 {@link Process } 객체.
                    //--------
                    // 판걸이를 행하려거든, 마지막 조판이 없거나,
                    if (this.empty() == true)
                        return null;
                    var last_placement = this.back();
                    if (last_placement.max_image_count() == 8)
                        return null;
                    //--------
                    // 판걸이를 행할 조판 리스트
                    //--------
                    var target_placements = new std.Deque();
                    target_placements.push_back(last_placement);
                    // 마지막 조판이 나머지 조판에 해당하는가
                    var dependent = last_placement.getDependent();
                    if (dependent != null) {
                        // 종속 조판도 판걸이 타깃에 추가
                        target_placements.push_front(dependent);
                        // 종속 조판 또한, 어떠한 조판에서 분리된 것이라면, 그 조판 또한 판걸이 타깃에 추가
                        if (dependent.image_count() != dependent.max_image_count() && this.size() >= 3)
                            target_placements.push_front(this.end().advance(-3).value);
                    }
                    //--------
                    // 판걸이 조판 실시.
                    //--------
                    // 가능한 모든 배수를 다 검사한다.
                    var best = null;
                    for (var multiplier = 2; multiplier <= this.image_.getCopies() // 판걸이 배수가 사분 부수보다 반드시 작아야 하고
                        && last_placement.max_image_count() * multiplier <= 8; multiplier *= 2) {
                        /////
                        // 더 큰 조판(들)을 생성
                        ////
                        var my_placements = [];
                        // 배치 최적리스트 中 N 배수의 조판 샘플을 사용해, 대안 조판을 확장
                        for (var i = 0; i < target_placements.size(); i++) {
                            var my_placement = new core.Placement(target_placements.at(i));
                            my_placement.plaste_expand(placements.get(last_placement.max_image_count() * multiplier));
                            my_placements.push(my_placement);
                        }
                        ////
                        // 새 대안 생성
                        ////
                        var my_process = new Process(this); // 복제
                        my_process.erase(my_process.end().advance(-my_placements.length), my_process.end()); // 이전 조판면 정보 삭제
                        my_process.push.apply(// 이전 조판면 정보 삭제
                        my_process, my_placements); // 대체 조판면 삽입
                        // 탐색
                        my_process = my_process._Explore_placements(placements, side, left_pages);
                        // best 와 비교하여 대치
                        if (my_process == null || my_process._Validate_optimization() == false)
                            continue;
                        else if (best == null || my_process.computePrice() < best.computePrice())
                            best = my_process;
                    }
                    return best;
                };
                /**
                 * @hidden
                 */
                Process.prototype._Erase_empty_placements = function () {
                    //--------
                    // 이미지 배치가 없는 조판을 지움.
                    // 
                    // 아직까지 하나의 이미지도 올리지 않는 빈 조판은 생긴 적이 없다. {@link _Erase_empty_placements} 
                    // 는 다만, 계산의 안정성을 위해서 추가된 메소드임.
                    //--------
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
                /**
                 * Get 공정 리스트.
                 */
                Process.prototype.getProcessArray = function () {
                    return this.process_array_;
                };
                /**
                 * Get 공정명.
                 */
                Process.prototype.getName = function () {
                    return this.name;
                };
                /**
                 * Get 오프셋 장치.
                 */
                Process.prototype.getDevice = function () {
                    return this.device_;
                };
                /**
                 * Get 이미지.
                 */
                Process.prototype.getImage = function () {
                    return this.image_;
                };
                /**
                 * Get 선택된 용지 모형.
                 */
                Process.prototype.getPaper = function () {
                    return this.paper_;
                };
                /**
                 * Get 가격모형 리스트.
                 */
                Process.prototype.getPriceModels = function () {
                    return this.price_models_;
                };
                /**
                 * 접지에 사용할 용지 모형을 정함.
                 */
                Process.prototype.setPaper = function (val) {
                    this.paper_ = val;
                };
                /* ---------------------------------------------------------
                    COMPUTATORS
                --------------------------------------------------------- */
                /**
                 * @hidden
                 */
                Process.prototype._Compute_placements = function () {
                    //--------
                    // 최적의 공간활용도를 보이는 조판면들을 구함.
                    // 
                    // 조판면으로 사용할 수 있는 각 용지의 크기에 따라 담을 수 있는 이미지의 수량이 달라진다. 또한, 
                    // 같은 수의 이미지를 담을 수 있는 용지더라도, 공간활용률에서 차이를 보일 수 있다. 
                    // {@link _Compute_placements} 는 같은 이미지를 담을 수 있는 조판면들 중, 최고의 공간활용도를
                    // 보이는 조판면만을 {@link TreeMap}에 담아 리턴하는, 최적의 조판면을 구해주는 함수이다.
                    // 
                    // @return 최적의 조판면과 그 조판면이 담을 수 있는 이미지 수량을 담은 {@link TreeMap} 객체.
                    //--------
                    var placements = new std.TreeMap(std.greater);
                    for (var i = 0; i < this.paper_.size(); i++) {
                        // 배치 구성
                        var placement = new core.Placement(this, this.paper_.at(i));
                        if (placement.max_image_count() == 0)
                            continue; // 단 한 장의 이미지도 넣을 수 없을만큼 작은 용지이다
                        // 현재와 같은 최대의 이미지 수를 넣을 수 있는 조판을 찾음
                        var it = placements.find(placement.max_image_count());
                        if (it.equals(placements.end()) == true)
                            placements.insert([placement.max_image_count(), placement]); // 없으면, 등록
                        else {
                            // 같은 수의 이미지를 넣을 수 있는 조판이 있다면,
                            // 공간 활용률이 높은 쪽을 남긴다 (아무래도 더 작은 종이, 효율이 높음)
                            if (placement._Compute_space_utilization_ratio() > it.second._Compute_space_utilization_ratio())
                                it.second = placement;
                        }
                    }
                    // 존재하지 않는 사이즈는, 가상으로 만든다.
                    var pages = [1, 2, 4];
                    for (var i = 0; i < pages.length; i++)
                        if (placements.has(pages[i]) == false) {
                            var paper_size = this._Create_virtual_paper_size(pages[i]);
                            var placement = new core.Placement(this, paper_size);
                            placements.emplace(pages[i], placement);
                        }
                    return placements;
                };
                /**
                 * 파라미터 (공정 조건) 에 대한 유효성 검증.
                 *
                 * 사용자는 공정에 대한 각종 조건 (파라미터) 들을 입력하고, 프로그램에 조판 최적화를 명령하게 된다.
                 * 이 때, 모종의 이유로 사용자가 입력한 조건 (파라미터) 에 논리적인 오류가 있을 수 있다. {@link validate}
                 * 는 이러한 논리적 오류를 찾아내고, 이 오류에 대한 이유를 메시지 리스트에 담아 리턴하는, 유효성 검증
                 * 함수이다.
                 *
                 * @todo Deprecate 대상임.
                 * @return 파라미터가 유효하지 않을 때, 어떻게 유효하지 않은 지 그 이유를 담은 메시지 리스트.
                 */
                Process.prototype.validate = function () {
                    var message_list = new std.List();
                    //// 단면 조판에 접지를 하건데, 라미네이팅까지 단면이다.
                    //if (this.device.isFolding() == true
                    //	&& this.price_models.getLaminating().isUsed() == true
                    //	&& this.price_models.getLaminating().getSide() == Side.SINGLE)
                    //{
                    //	message_list.push_back
                    //	(
                    //		"접지를 하는 경우, 단면 라미네이팅을 적용할 수 없습니다. " +
                    //		"접지를 하지 않던가 혹은 라미네이팅을 양면으로 해 주십시오."
                    //	);
                    //}
                    return message_list;
                };
                /**
                 * @hidden
                 */
                Process.prototype._Validate_optimization = function () {
                    //--------
                    // 최적화에 대한 유효성 검증.
                    // 
                    // 공정 최적화를 행하는 동안, 다양한 배치안을 탐색하게 된다.그리고 그 다양한 배치안 중에는,
                    // 필연적으로 유효하지 않은 (존재할 수 없는) 배치안 또한 생성되기 마련이다. 
                    // {@link _Validate_optimization} 은 이런 무효한 공정을 거르기 위한, 유효성 검증 함수이다.
                    // 
                    // @return 유효 여부
                    //--------
                    var side = this.computeSide();
                    if (side == core.Side.SINGLE)
                        return true;
                    return std.all_of(this.begin(), this.end(), function (placement) {
                        return placement.validate(side);
                    });
                };
                /**
                 * 현 조판 공정의 양-단면 여부를 계산함.
                 *
                 * 인쇄 공정을 기준으로 하여 양-단면 여부를 판별한다.
                 *
                 * @return 양단면 코드.
                 */
                Process.prototype.computeSide = function () {
                    // 현재는 인쇄가 기준 공정 및 필수 공정이다.
                    // 추후 인쇄가 비필수 공정이 될 것이고, 다른 공정을 기준으로 삼을 수도 있게 될 것이다.
                    return this.price_models_.getPrint().getSide();
                };
                /**
                 * 최종 가격을 계산함.
                 */
                Process.prototype.computePrice = function () {
                    return this.price_models_.computePrice(this);
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
                    /**
                     * @hidden
                     */
                    get: function () {
                        return this.name;
                    },
                    /**
                     * @hidden
                     */
                    set: function (val) {
                        this.name = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Process.prototype, "$page", {
                    /**
                     * @hidden
                     */
                    get: function () {
                        return core.library.StringUtil.numberFormat(this.getImage().getPages()) + " 쪽";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Process.prototype, "$copies", {
                    /**
                     * @hidden
                     */
                    get: function () {
                        return core.library.StringUtil.numberFormat(this.getImage().getCopies()) + " 부";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Process.prototype, "$price", {
                    /**
                     * @hidden
                     */
                    get: function () {
                        return core.library.StringUtil.numberFormat(this.computePrice(), 0) + " 원";
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
                    xml.push(this.device_.toXML());
                    xml.push(this.image_.toXML());
                    xml.push(this.price_models_.toXML());
                    if (this.paper_ != null)
                        xml.setProperty("paper", this.paper_.key());
                    return xml;
                };
                return Process;
            }(core.protocol.EntityArray));
            core.Process = Process;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * <p> 공정 리스트. </p>
             *
             * <p> ProcessArray 는 개별 공정 Process 를 리스트로 지니는 클래스이다. 자식 객체 Process 들을
             * Composition 관계로 지니는 것에 더불어, 종이모형 리스트 PaperModelArray 를 가지고 있다. </p>
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var ProcessArray = (function (_super) {
                __extends(ProcessArray, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                function ProcessArray() {
                    var _this = _super.call(this) || this;
                    _this.paper_array_ = new core.PaperModelArray();
                    _this.cutter_ = new core.Cutter();
                    _this.init();
                    return _this;
                }
                /**
                 * @inheritdoc
                 */
                ProcessArray.prototype.construct = function (xml) {
                    this.paper_array_.construct(xml.get(this.paper_array_.TAG()).front());
                    this.cutter_.construct(xml.get(this.cutter_.TAG()).front());
                    _super.prototype.construct.call(this, xml);
                };
                /**
                 * @inheritdoc
                 */
                ProcessArray.prototype.createChild = function (xml) {
                    return new core.Process(this);
                };
                /* ---------------------------------------------------------
                    PROCEDURES
                --------------------------------------------------------- */
                /**
                 * 멤버변수 초기화.
                 */
                ProcessArray.prototype.init = function () {
                    this.paper_array_.init();
                    this.cutter_.init();
                    this.clear();
                    this.push_back(new core.Process(this));
                };
                /**
                 * 최적화를 행함.
                 */
                ProcessArray.prototype.optimize = function () {
                    for (var i = 0; i < this.size(); i++)
                        this.at(i).optimize();
                };
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * Get 종이모형 리스트.
                 */
                ProcessArray.prototype.getPaperArray = function () {
                    return this.paper_array_;
                };
                /**
                 * Get 재단기.
                 */
                ProcessArray.prototype.getCutter = function () {
                    return this.cutter_;
                };
                /**
                 * 최종 가격을 계산함.
                 */
                ProcessArray.prototype.computePrice = function () {
                    var price = 0;
                    for (var i = 0; i < this.size(); i++)
                        price += this.at(i).computePrice();
                    return price;
                };
                /**
                 * 파라미터 (공정 조건) 에 대한 유효성 검증.
                 *
                 * 사용자는 공정들 ({@link Process} objects) 에 대한 각종 조건 (파라미터) 들을 입력하고,
                 * 프로그램에 조판 최적화를 명령하게 된다. 이 때, 모종의 이유로 사용자가 입력한 조건 (파라미터) 에
                 * 논리적인 오류가 있을 수 있다. {@link validate} 는 이러한 논리적 오류를 찾아내고,
                 * 이 오류에 대한 이유를 메시지 리스트에 담아 리턴하는, 유효성 검증 함수이다.
                 *
                 * @return 파라미터가 유효하지 않을 때, 어떻게 유효하지 않은 지 그 이유를 담은 메시지 리스트.
                 */
                ProcessArray.prototype.validate = function () {
                    var message_list = new std.HashSet();
                    for (var it = this.begin(); !it.equals(this.end()); it = it.next()) {
                        var my_messages = it.value.validate();
                        message_list.insert(my_messages.begin(), my_messages.end());
                    }
                    return message_list;
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
                    xml.push(this.paper_array_.toXML());
                    xml.push(this.cutter_.toXML());
                    return xml;
                };
                return ProcessArray;
            }(core.protocol.EntityArrayCollection));
            core.ProcessArray = ProcessArray;
        })(core = folding.core || (folding.core = {}));
    })(folding = bws.folding || (bws.folding = {}));
})(bws || (bws = {}));
/// <reference path="API.ts" />
var bws;
(function (bws) {
    var folding;
    (function (folding) {
        var core;
        (function (core) {
            /**
             * Placement 내 각 페이지의 배치 정보.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            var Wrap = (function () {
                function Wrap(placement, row, col) {
                    if (row === void 0) { row = -1; }
                    if (col === void 0) { col = -1; }
                    this.placement_ = placement;
                    this.row_ = row;
                    this.col_ = col;
                }
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * Get 소속 조판면 배치정보 객체.
                 */
                Wrap.prototype.getPlacement = function () {
                    return this.placement_;
                };
                /**
                 * 행 번호.
                 */
                Wrap.prototype.row = function () {
                    return this.row_;
                };
                /**
                 * 열 번호.
                 */
                Wrap.prototype.col = function () {
                    return this.col_;
                };
                /* ---------------------------------------------------------
                    COMPUTATORS
                --------------------------------------------------------- */
                /**
                 * @hidden
                 */
                Wrap.prototype._Compute_folding_direction = function () {
                    //--------
                    // 접히는 방향을 계산함.
                    //--------
                    var binding_direction = this.placement_.getProcess().getImage().getBindingDirection();
                    var vertical_binding = (binding_direction == core.Direction.UP || binding_direction == core.Direction.DOWN);
                    var vertical_folding = this.placement_.isRotated() ? !vertical_binding : vertical_binding;
                    return vertical_folding ? core.Direction.VERTICAL : core.Direction.HORIZONTAL;
                };
                /**
                 * 이미지가 배치되는 영역 Rectangle 을 계산함.
                 */
                Wrap.prototype.computeSector = function () {
                    var device = this.placement_.getProcess().getDevice();
                    var rect = {};
                    {
                        rect.width = this.placement_.computePrintableWidth() / this.placement_.col_size();
                        rect.height = this.placement_.computePrintableHeight() / this.placement_.row_size();
                        rect.x =
                            device.computeBitedWidth() + device.getNonPrintableWidth() +
                                this.placement_.computePrintableWidth() * this.col_ / this.placement_.col_size();
                        rect.y =
                            device.computeBitedHeight() + device.getNonPrintableHeight() +
                                this.placement_.computePrintableHeight() * this.row_ / this.placement_.row_size();
                    }
                    return rect;
                };
                /**
                 * 이미지의 여백을 둘러싼 영역 Rectangle 을 계산함.
                 */
                Wrap.prototype.computeMargin = function () {
                    var image = this.placement_.getImage();
                    var point = this.computePoint();
                    var margin = {};
                    if (this._Compute_folding_direction() == core.Direction.HORIZONTAL) {
                        // HEIGHT AND Y POINT ARE FIXED
                        margin.height = this.placement_.computeImageHeight() + 2 * image.getMargin();
                        margin.y = point.y - image.getMargin();
                        if (this.placement_.col_size() == 1) {
                            // MARGIN ON BOTH LEFT AND RIGHT
                            margin.width = this.placement_.computeImageWidth() + 2 * image.getMargin();
                            margin.x = point.x - image.getMargin();
                        }
                        else if (this.col_ % 2 == 0) {
                            // MARGIN ON LEFT
                            margin.width = this.placement_.computeImageWidth() + image.getMargin();
                            margin.x = point.x - image.getMargin();
                        }
                        else {
                            // MARGIN ON RIGHT
                            margin.width = this.placement_.computeImageWidth() + image.getMargin();
                            margin.x = point.x;
                        }
                    }
                    else {
                        // WIDTH AND X POINT ARE FIXED
                        margin.width = this.placement_.computeImageWidth() + 2 * image.getMargin();
                        margin.x = point.x - image.getMargin();
                        if (this.placement_.row_size() == 1) {
                            // MARGIN ON BOTH TOP AND BOTTOM
                            margin.height = this.placement_.computeImageHeight() + 2 * image.getMargin();
                            margin.y = point.y - image.getMargin();
                        }
                        else if (this.row_ % 2 == 0) {
                            // MARGIN ON TOP
                            margin.height = this.placement_.computeImageHeight() + image.getMargin();
                            margin.y = point.y - image.getMargin();
                        }
                        else {
                            // MARGIN ON BOTTOM
                            margin.height = this.placement_.computeImageHeight() + image.getMargin();
                            margin.y = point.y;
                        }
                    }
                    return margin;
                };
                /**
                 * 이미지가 배치되는 좌표를 계산함.
                 */
                Wrap.prototype.computePoint = function () {
                    var sector = this.computeSector();
                    var x;
                    var y;
                    if (this._Compute_folding_direction() == core.Direction.HORIZONTAL) {
                        y = sector.y + (sector.height - this.placement_.computeImageHeight()) / 2.0;
                        if (this.placement_.col_size() == 1) {
                            // ONLY A COL -> CENTER ALIGN
                            x = sector.x + (sector.width - this.placement_.computeImageWidth()) / 2.0;
                        }
                        else if (this.col_ % 2 == 0) {
                            // EVEN NUMBER -> RIGHT ALIGN
                            x = (sector.x + sector.width) - this.placement_.computeImageWidth();
                        }
                        else {
                            // ODD NUMBER -> LEFT ALIGN
                            x = sector.x;
                        }
                    }
                    else {
                        x = sector.x + (sector.width - this.placement_.computeImageWidth()) / 2.0;
                        if (this.placement_.row_size() == 1) {
                            // ONLY A ROW -> CENTER ALIGN
                            y = sector.y + (sector.height - this.placement_.computeImageHeight()) / 2.0;
                        }
                        else if (this.row_ % 2 == 0) {
                            // EVEN NUMBER -> BOTTOM ALIGN
                            y = (sector.y + sector.height) - this.placement_.computeImageHeight();
                        }
                        else {
                            // ODD NUMBER -> LEFT ALIGN
                            y = sector.y;
                        }
                    }
                    return { x: x, y: y };
                };
                return Wrap;
            }());
            core.Wrap = Wrap;
        })(core = folding.core || (folding.core = {}));
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
            return _super.apply(this, arguments) || this;
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
                var label = React.createElement("li", { key: i, className: "tabNavigator_label" },
                    React.createElement("a", { href: "#", className: className, onClick: this.handle_change.bind(this, i) }, child.props.label));
                tabs.push(label);
            }
            var ret = React.createElement("div", { className: "tabNavigator", style: this.props.style },
                React.createElement("ul", { className: "tabNavigator_label" }, tabs),
                selected);
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
            return _super.apply(this, arguments) || this;
        }
        NavigatorContent.prototype.render = function () {
            return React.createElement("div", { className: "tabNavigator_content" }, this.props.children);
        };
        return NavigatorContent;
    }(React.Component));
    flex.NavigatorContent = NavigatorContent;
})(flex || (flex = {}));
//# sourceMappingURL=folding-application.js.map
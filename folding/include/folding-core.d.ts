/// <reference types="samchon-framework" />
/// <reference types="tstl" />
/**
 * 코어 연산부.
 *
 * 모듈 {@link core} 는 오프셋 견적을 계산해내는 코어 연산부이다.
 *
 * 모든 연산의 시작은 {@link ProcessArray} 객체로부터 시작한다. {@link ProcessArray} 객체를 생성하자.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
declare namespace bws.folding.core {
    /**
     * Shorcut of {@link samchon.library}.
     */
    export import library = samchon.library;
    /**
     * Shorcut of {@link samchon.collection}.
     */
    export import collections = samchon.collections;
    /**
     * Shorcut of {@link samchon.protocol}.
     */
    export import protocol = samchon.protocol;
    enum Side {
        /**
         * 단면.
         */
        SINGLE = 1,
        /**
         * 양면.
         */
        DOUBLE = 2,
        /**
         * 앞면.
         */
        FRONT = 1,
        /**
         * 뒷면.
         */
        BACK = 2,
    }
    enum Direction {
        HORIZONTAL = 1,
        VERTICAL = 2,
        UP = 8,
        DOWN = 2,
        LEFT = 4,
        RIGHT = 6,
    }
    /**
     * 초기 설정값.
     */
    class Initial {
        static readonly SIDE: Side;
        static readonly PAGES: number;
        static readonly COPIES: number;
        static readonly FOLD: boolean;
    }
}
declare namespace bws.folding.core {
    /**
     * <p> 재단기 엔티티. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Cutter extends protocol.Entity implements IPriceModel {
        /**
         * 작업비
         */
        private workPrice;
        /**
         * 1단위 작업 용지장수
         */
        private workSheets;
        /**
         * 1회 절단 비용.
         */
        private cutPrice;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        init(): void;
        getWorkingPrice(): number;
        getWorkingSheets(): number;
        getCuttingPrice(): number;
        setWorkingPrice(val: number): void;
        setWorkingSheets(val: number): void;
        setCuttingPrice(val: number): void;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
        private _Compute_work_price(process);
        private _Compute_cutting_price(process);
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
        private _Compute_units(process);
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
        private _ToGridRows_cutting(process);
    }
}
declare namespace bws.folding.core {
    /**
     * 오프셋 장비 엔티티.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Device extends protocol.Entity {
        /**
         * 구와이 길이
         */
        private biteLength;
        /**
         * 구와이가 물리는 방향.
         *	- false: 가로
         *	- true: 세로
         */
        private biteDirection;
        /**
         * 인쇄 불가능 영역 中 가로.
         *
         * 구와이를 합한 수치가 아니다. 실제 인쇄 불가능 영역을 사용할 때에는 구와이 영역과 합하여 써야 함
         */
        private nonPrintableWidth;
        /**
         * 인쇄 불가능 영역 中 세로.
         *
         * 구와이를 합한 수치가 아니다. 실제 인쇄 불가능 영역을 사용할 때에는 구와이 영역과 합하여 써야 함
         */
        private nonPrintableHeight;
        private fold;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Initialization Constructor.
         *
         * @param bited 구와이 길이.
         * @param bited_direction 구와이가 물리는 방향.
         * @param non_printable_width 인쇄 불가능 영역 中 가로.
         * @param non_printable_height 인쇄 불가능 영역 中 세로.
         */
        constructor(bited: number, bited_direction: Direction, non_printable_width: number, non_printable_height: number, fold: boolean);
        /**
         * 멤버변수 일괄 초기화.
         */
        init(): void;
        /**
         * 구와이 가로 길이를 계산.
         */
        computeBitedWidth(): number;
        /**
         * 구와이 세로 길이를 계산.
         */
        computeBitedHeight(): number;
        getBiteLength(): number;
        getBiteDirection(): Direction;
        getNonPrintableWidth(): number;
        getNonPrintableHeight(): number;
        isFolding(): boolean;
        setBiteLength(val: number): void;
        setBiteDirection(val: Direction): void;
        setNonPrintableWidth(val: number): void;
        setNonPrintableHeight(val: number): void;
        setFolding(val: boolean): void;
        TAG(): string;
    }
}
declare namespace bws.folding.core {
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
    class Folder {
        /**
         * @hidden
         */
        private row_size_;
        /**
         * @hidden
         */
        private col_size_;
        /**
         * @hidden
         */
        private element_array_;
        /**
         * @hidden
         */
        private history_;
        /**
         * @hidden
         */
        private $folded_row_size_;
        /**
         * @hidden
         */
        private $folded_col_size_;
        /**
         * Construct from matrix size.
         *
         * @param rows 행 크기
         * @param cols 열 크기
         */
        constructor(rows: number, cols: number);
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
        fold(direction: Direction): void;
        /**
         * 행렬 전체 원소의 수.
         */
        count(): number;
        /**
         * 행 크기.
         */
        row_size(): number;
        /**
         * 열 크기.
         */
        col_size(): number;
        /**
         * Get 접지방향 리스트.
         */
        getHistory(): std.List<Direction>;
        /**
         * @hidden
         */
        private _Fetch_element(side, row, col);
        /**
         * 페이지 번호를 역순으로 뒤집는다.
         *
         * 좌철에서 우철로, 상철에서 하철로 변형할킬 때 사용함.
         */
        reverse(): void;
        /**
         * (링제본, 상-하철, 짝수 페이지의) 각도를 반전시킴.
         *
         * 짝수 번째 페이지를 180 도 뒤집는다. 링제본일 때 그리고 상철 혹은 하철일 때, 짝수 번째 페이지를 홀수 번째
         * 페이지와 반전된 방향으로 배치할 때 사용함.
         */
        inverse(): void;
        /**
         * 현재의 {@link Folding} 객체를 {@link Page} 객체의 행렬로 변환한다.
         *
         * @param side 양단면 코드
         * @return 행렬 of {@link Page} 객체들
         */
        toMatrix(side: Side): Matrix<Page>;
    }
}
declare namespace bws.folding.core {
    /**
     * 접지 행위 {@link Folder} 의 각 행렬 원소에 대한 엔티티.
     *
     * {@link Folder} 에서 한 단계씩 접지를 행할 때마다 (@link Folder.fold Folder.fold()), 본 클래스
     * {@link FolderElement} 의 멤버 데이터들이 그에 맞추어 변하게 된다.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class FolderElement {
        /**
         * 현재의 양단면 코드.
         */
        side: Side;
        /**
         * 현재의 행 번호.
         */
        row: number;
        /**
         * 현재의 열 번호.
         */
        col: number;
        /**
         * 현재의 페이지 번호.
         */
        page: number;
        /**
         * 현재의 각도.
         */
        angle: number;
        /**
         * Initializer Constructor.
         *
         * @param side 양단면 코드.
         * @param row 행 번호.
         * @param col 열 번호.
         */
        constructor(side: Side, row: number, col: number);
    }
}
declare namespace bws.folding.core {
    /**
     * 행렬 클래스.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Matrix<T> {
        /**
         * @hidden
         */
        private data_;
        /**
         * Initializer Constructor.
         *
         * @param row 행의 크기
         * @param col 열의 크기
         */
        constructor(row: number, col: number);
        /**
         * 행 크기.
         */
        row_size(): number;
        /**
         * 열 크기.
         */
        col_size(): number;
        /**
         * 원소에 액세스.
         *
         * @param r 행 번호.
         * @param c 열 번호.
         *
         * @return 원소값
         */
        at(r: number, c: number): T;
        /**
         * 원소 값을 변경
         *
         * @param r 행 번호.
         * @param c 열 번호.
         * @param value 변경할 값.
         */
        set(r: number, c: number, value: T): void;
        /**
         * 데이터 액세스.
         *
         * 행렬 원소들이 담긴 2차원 배열이 직접 액세스함.
         *
         * @returns 2차원 배열.
         */
        data(): T[][];
        /**
         * 전치 행렬.
         */
        transpose(): Matrix<T>;
        /**
         * 행렬 좌회전.
         */
        rotate_left(): Matrix<T>;
    }
}
declare namespace bws.folding.core {
    /**
     * 조판행렬의 원소, 페이지 엔티티.
     *
     * 조편행렬의 원소에 해당하는 페이지 엔티티로써, 현 원소가 대표할 페이지 번호와 각도를 기록함.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Page extends protocol.Entity {
        /**
         * @hidden
         */
        private page;
        /**
         * @hidden
         */
        private angle;
        /**
         * Initializer Constructor.
         *
         * @param page 페이지 번호.
         * @param angle 회전 각도.
         */
        constructor(page: number, angle: number);
        /**
         * 페이지 번호.
         */
        getPage(): number;
        /**
         * 회전 각도.
         */
        getAngle(): number;
        /**
         * 좌측으로 90도 회전.
         */
        rotate(): void;
        /**
         * @inheritdoc
         */
        TAG(): string;
    }
}
declare namespace bws.folding.core {
    /**
     * <p> 이미지 엔티티. </p>
     *
     * <p> 인쇄코자 하는 이미지의 크기 및 장수와 사본 수를 지니는 엔티티이다. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Image extends protocol.Entity {
        /**
         * 재단 가로
         */
        private width;
        /**
         * 재단 세로
         */
        private height;
        /**
         * 작업 여유분
         */
        private margin;
        /**
         * 페이지 수량
         */
        private pages;
        /**
         * 필요 사본수량
         */
        private copies;
        /**
         * 제본 방향.
         */
        private bindingDirection;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Copy Constructor.
         *
         * @param image Object to copy.
         */
        constructor(image: Image);
        /**
         * 데이터 초기화. 기본값으로 되돌림.
         */
        init(): void;
        /**
         * 이미지 면적을 계산함.
         */
        computeArea(): number;
        getWidth(): number;
        getHeight(): number;
        getMargin(): number;
        getPages(): number;
        getCopies(): number;
        getBindingDirection(): Direction;
        setWidth(val: number): void;
        setHeight(val: number): void;
        setMargin(val: number): void;
        setPages(val: number): void;
        setCopies(val: number): void;
        setBindingDirection(val: Direction): void;
        /**
         * @inheritdoc
         */
        TAG(): string;
    }
}
declare namespace bws.folding.core {
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
    class PaperModel extends protocol.EntityArrayCollection<PaperSize> implements IPriceModel {
        /**
         * @hidden
         */
        private name;
        /**
         * @hidden
         */
        private areaPrice;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        createChild(xml: library.XML): PaperSize;
        /**
         * 멤버변수 일괄 초기화.
         */
        init(): void;
        /**
         * 종이명 (재질명) 이 종이모형의 키값이다.
         */
        key(): string;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
        /**
         * 조판에 사용케되는 용지의 총 면적 (장수 기준) 을 계산함.
         *
         * @param process 개별 공정
         * @return 용지의 총 면적
         *
         * @see {@link computeUnits}
         */
        private _Compute_main_area(process);
        /**
         * 현재의 조판이 필요로 하는 여분지, 그 여분지의 총 면적을 계산함.
         *
         * @param process 접지행위자
         * @return 필요 여분지에 대한 총 면적
         */
        private _Compute_spare_area(process);
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
        computeUnits(process: Process): std.HashMap<PaperSize, number>;
        /**
         * Get 지류; 종이종류명.
         */
        getName(): string;
        /**
         * Get 단위면적당 종이가격 가격 ($price / m²).
         */
        getPrice(): number;
        /**
         * @hidden
         */
        /**
         * @hidden
         */
        $name: string;
        /**
         * @hidden
         */
        /**
         * @hidden
         */
        $price: string;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        CHILD_TAG(): string;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
        /**
         * @hidden
         */
        private _ToGridRows_area(process);
    }
}
declare namespace bws.folding.core {
    /**
     * 종이모형 리스트.
     *
     * 종이모형 편집기, 데이터 그리드에 각 종이모형을 표기하기 위한 데이터 프로바이더 컬렉션이다.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class PaperModelArray extends protocol.EntityArrayCollection<PaperModel> {
        /**
         * 멤버변수 일괄 초기화.
         */
        init(): void;
        /**
         * @inheritdoc
         */
        createChild(xml: library.XML): PaperModel;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        CHILD_TAG(): string;
    }
}
declare namespace bws.folding.core {
    /**
     * 종이 크기 엔티티.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class PaperSize extends protocol.Entity implements std.IComparable<PaperSize> {
        /**
         * @hidden
         */
        private width;
        /**
         * @hidden
         */
        private height;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Initializer Constructor.
         *
         * @param width 가로 크기
         * @param height 세로 크기
         */
        constructor(width: number, height: number);
        /**
         * @inheritdoc
         */
        construct(xml: library.XML): void;
        /**
         * @inheritdoc
         */
        key(): std.Pair<number, number>;
        /**
         * Get 가로 길이.
         */
        getWidth(): number;
        /**
         * Get 세로 길이.
         */
        getHeight(): number;
        /**
         * 종이 크기 (면적) 을 계산.
         */
        computeArea(): number;
        /**
         * @inheritdoc
         */
        less(obj: PaperSize): boolean;
        /**
         * @inheritdoc
         */
        equals(obj: PaperSize): boolean;
        /**
         * @hidden
         */
        /**
         * @hidden
         */
        $width: string;
        /**
         * @hidden
         */
        /**
         * @hidden
         */
        $height: string;
        /**
         * @inheritdoc
         */
        TAG(): string;
    }
}
declare namespace bws.folding.core {
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
    class Placement extends protocol.Entity {
        /**
         * @hidden
         */
        private process_;
        /**
         * @hidden
         */
        private paper_size_;
        /**
         * @hidden
         */
        private readonly device_;
        /**
         * @hidden
         */
        private readonly image_;
        /**
         * @hidden
         */
        private rows;
        /**
         * @hidden
         */
        private cols;
        /**
         * @hidden
         */
        private rotated;
        /**
         * @hidden
         */
        private image_count_;
        /**
         * @hidden
         */
        private face_count_;
        /**
         * @hidden
         */
        private dependency_;
        /**
         * @hidden
         */
        private dependent_;
        /**
         * @hidden
         */
        private inverse_count_;
        /**
         * @hidden
         */
        private plaste_count_;
        /**
         * Construct from a Process
         *
         * @param process 현 조판면 모형의 소속 공정.
         */
        constructor(process: Process);
        /**
         * Initializer Constructor.
         *
         * @param process 현 조판면 모형의 소속 공정.
         * @param paper 현 조편면이 사용케 될 용지크기. 즉 현 조판면의 크기.
         */
        constructor(process: Process, paper: PaperSize);
        /**
         * Copy Constructor.
         *
         * @param obj Object to copy.
         */
        constructor(obj: Placement);
        /**
         * @inheritdoc
         */
        construct(xml: library.XML): void;
        /**
         * @inheritdoc
         */
        createChild(xml: library.XML): Wrap;
        /**
         * 현 조판면을 확장.
         *
         * @param placement 타깃 조판면
         */
        plaste_expand(placement: Placement): void;
        /**
         * 조판을 위한 변수들을 할당함.
         *
         * @param imageCount 이미지 페이지 수
         * @param faceCount 현 배치를 반복할 횟수
         */
        allocate(imageCount: number, faceCount: number): void;
        /**
         * @hidden
         */
        private _Construct_counts();
        /**
         * Get 공정 객체.
         *
         * @return 현 조판면 모형의 소속 공정.
         */
        getProcess(): Process;
        /**
         * Get 용지 크기.
         *
         * @returns 현 조편면이 사용케 될 용지크기. 즉 현 조판면의 크기.
         */
        getPaperSize(): PaperSize;
        /**
         * Get 배치케 될 이미지.
         */
        getImage(): Image;
        /**
         * Get 속국.
         *
         * 여백을 남기는 대형 조판을 행한 경우; 자식 조판.
         */
        getDependency(): Placement;
        /**
         * Get 종속 부모.
         *
         * 여백을 남기는 대형 조판을 행한 경우; 부모 조판.
         */
        getDependent(): Placement;
        /**
         * 세로로 배치할 수 있는 최대 행 크기.
         */
        row_size(): number;
        /**
         * 가로로 배치할 수 있는 최대 열 크기.
         */
        col_size(): number;
        /**
         * 현재의 조판면에 쌓을 수 있는 최대 이미지 수.
         *
         * 단, 아무리 많은 이미지를 배치 가능하더라도, 한 판면에 최대 배치 가능한 이미지 수는 오로지 8 장이다.
         *
         * @return 조판 가능한 최대 이미지 수 (0 ~ 8).
         */
        max_image_count(): number;
        /**
         * 회전 여부.
         */
        isRotated(): boolean;
        /**
         * 현재 각 판면에 배치된 이미지 수
         */
        image_count(): number;
        /**
         * 현재의 배치를 사용하게 되는 판면 수.
         *
         * 한 부 내에서 쓰이는 판면 수만을 의미한다. 전체 사본 부수와 돈땡 및 판걸이를 반영한 판면 수가 아님.
         */
        face_count(): number;
        /**
         * 현 조판면이 사용하게 될 용지 장 수.
         */
        sheet_count(): number;
        /**
         * 현 조판면 하나에 들어갈 수 있는 최대 페이지 수.
         */
        page_count(): number;
        /**
         * 역전 판면 분할 개수; 돈땡.
         *
         * 양면 조판에 판면의 수가 홀수 개일 경우, 마지막 페이지에 행하는 분할 (돈땡) 수.
         *
         * 판의 한 면에 앞뒷면 페이지가 교차하여 배치된다.
         */
        inverse_count(): number;
        /**
         * Get 판걸이 분할 수.
         */
        plaste_count(): number;
        /**
         * Get 종속된 조판. 속국 or 종속 부모.
         */
        getLink(): Placement;
        /**
         * 현 조판이 유효한 지 검사한다.
         *
         * 유효성 검사는 오로지 양면 조판일 때만 행한다. 양편 조판이되 홀수의 조판면을 사용하는 경우, 그리고
         * 돈땡이나 판걸이 등의 분할을 행하지 않은 경우에 유효하지 않은 조판으로 간주된다.
         *
         * @param side 양단면 코드.
         * @return 유효성.
         */
        validate(side: Side): boolean;
        /**
         * @hidden
         */
        _Get_face_count(): number;
        /**
         * @hidden
         */
        _Set_face_count(val: number): void;
        /**
         * @hidden
         */
        _Subtract_face_count(): void;
        /**
         * @hidden
         */
        _Set_inverse_count(val: number): void;
        /**
         * @hidden
         */
        _Set_dependency(obj: Placement): void;
        /**
         * @hidden
         */
        _Set_dependent(obj: Placement): void;
        /**
         * @hidden
         */
        readonly $width: string;
        /**
         * @hidden
         */
        readonly $height: string;
        /**
         * @hidden
         */
        readonly $image_count: string;
        /**
         * @hidden
         */
        readonly $paper_count: string;
        /**
         * @hidden
         */
        readonly $copies: string;
        /**
         * @hidden
         */
        readonly $rotated: string;
        /**
         * 인쇄 가능 영역 中 가로 길이를 계산.
         */
        computePrintableWidth(): number;
        /**
         * 인쇄 가능 영역 中 세로 길이를 계산.
         */
        computePrintableHeight(): number;
        /**
         * (회전 후의) 이미지 가로 길이를 계산.
         */
        computeImageWidth(): number;
        /**
         * (회전 후의) 이미지 세로 길이를 계산.
         */
        computeImageHeight(): number;
        /**
         * 사본 수를 계산한다.
         *
         * 보통은 부수를 따라가나, 돈땡이나 판걸이에 의해 사본 수가 줄어드는 경우가 있다.
         *
         * @return 조정된 사본 수량.
         */
        computeCopies(): number;
        /**
         * 현 배치 조판면을 사용하는 첫 페이지.
         */
        computeFirstPage(): number;
        /**
         * 현 배치 조판면을 사용하는 마지막 페이지.
         */
        computeLastPage(): number;
        /**
         * @hidden
         */
        _Compute_space_utilization_ratio(): number;
        /**
         * @hidden
         */
        private _Containable();
        /**
         * @hidden
         */
        private _Floor(val);
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        CHILD_TAG(): string;
        /**
         * @inheritdoc
         */
        toXML(): library.XML;
    }
}
declare namespace bws.folding.core {
    /**
     * <p> 비필수 선택 가격모형. </p>
     *
     * <p> {@link OptionalModel} 은 조판 과정에 있어 필수가 아닌, 사용자가 취사 선택할 수 있는 공정들에 대한 추상
     * 가격모형 클래스이다. 현 공정이 조판에서 사용되는 가를 의미하는 {@link used} 와 현 공정을 적용키 위해 필요한
     * 면당 여분지 수량을 의미하는 {@link sparePapers} 를 멤버로 가진다. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    abstract class OptionalModel extends protocol.Entity implements IPriceModel {
        /**
         * 해당 모형이 현재 인쇄작업에서 사용되는 있는가.
         */
        protected used: boolean;
        /**
         * 현재 공정을 적용함에 있어 필요한, 매 판당 여분용지 장수.
         */
        protected sparePapers: number;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        abstract init(): void;
        /**
         * @inheritdoc
         */
        abstract computePrice(process: Process): number;
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
        computeSpareArea(process: Process): number;
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
        protected computeFaceCounts(process: Process): std.Vector<std.Pair<Placement, number>>;
        isUsed(): boolean;
        getSparePapers(): number;
        setUsed(val: boolean): void;
        setSparePapers(val: number): void;
        /**
         * @inheritdoc
         */
        abstract toGridRows(process: Process): IPriceRow[];
        protected toGridRows_sparePapers(process: Process): IPriceRow[];
    }
}
declare namespace bws.folding.core {
    /**
     * <p> 비필수 양단면 선택가능 모형. </p>
     *
     * <p> {@link SideOptionalModel} 은 조판 과정에서 필수가 아닌, 사용자가 취사 선택할 수 있는 공정 中 양/단면 여부를
     * 추가적으로 결정할 수 있는 공정들에 대한 추상 가격모형 클래스이다. {@link OptionalModel} 의 멤버에 더불어, 양/단면
     * 코드를 의미하는 {@link side} 멤버를 추가로 가진다. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    abstract class SideOptionalModel extends OptionalModel {
        /**
         * 양단면 코드.
         *
         * <ul>
         *	<li> 1: 단면 </li>
         *	<li> 2: 양면 </li>
         * </ul>
         */
        protected side: Side;
        getSide(): Side;
        setSide(val: Side): void;
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
        protected computeFaceCounts(process: Process): std.Vector<std.Pair<Placement, number>>;
    }
}
declare namespace bws.folding.core {
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
    class FoilModel extends SideOptionalModel {
        /**
         * 작업비.
         */
        private workPrice;
        /**
         * 1 작업 단위 면 수량.
         */
        private workFaces;
        /**
         * 동판비 / cm²
         */
        private copperPrice;
        /**
         * 박 잉크비 / m²
         */
        private inkPrice;
        /**
         * <p> (임시 변수) 이미지 면적 대비 잉크 사용률. </p>
         *
         * <p> 본래는 외부 프로그램과 연동하여, 실제 박 면적을 계산하여야 한다. 하지만, 현재는 이미지 면적 대비
         * 박이 찍히는 비율을 입력받아, 이를 기초로 박 면적을 계산하고 있다. {@link __inkAreaPercentage} 는
         * 그 비율을 설정할 수 있는 변수이다. </p>
         */
        private inkAreaPercentage;
        /**
         * @inheritdoc
         */
        init(): void;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
        /**
         * 단위 수를 계산함.
         */
        private _Compute_units(process);
        private _Compute_work_price(process);
        private _Compute_copper_area(process);
        private _Compute_copper_price(process);
        private _Compute_ink_area(process);
        private _Compute_ink_price(process);
        getWorkPrice(): number;
        getWorkFaces(): number;
        getCopperPrice(): number;
        getInkPrice(): number;
        $getInkAreaPercentage(): number;
        setWorkPrice(val: number): void;
        setWorkFaces(val: number): void;
        setCopperPrice(val: number): void;
        setInkPrice(val: number): void;
        $setInkAreaPercentage(val: number): void;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
        private _ToGridRows_units(process);
    }
}
declare namespace bws.folding.core {
    /**
     * 가격모형 인터페이스.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    interface IPriceModel extends protocol.IEntity {
        /**
         * 멤버변수 일괄 초기화.
         */
        init(): void;
        /**
         * 가격을 계산함.
         */
        computePrice(process: Process): number;
        /**
         * 견적 상세내역 테이블에 출력될 행 리스트를 출력.
         */
        toGridRows(process: Process): IPriceRow[];
    }
    /**
     * 결과 표에 찍히는 레코드용 인터페이스.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    interface IPriceRow {
        /**
         * 항목명.
         */
        name: string;
        /**
         * (주, 합계) 가격.
         */
        price?: number;
        /**
         * 부속 가격.
         */
        sub_price?: number;
        /**
         * 주석 내지 서술문.
         */
        comment?: string;
    }
}
declare namespace bws.folding.core {
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
    class LaminatingModel extends SideOptionalModel {
        /**
         * 기본 요금.
         */
        private basePrice;
        /**
         * 기본요금 구간면수.
         *
         * 기본 요금이 부과되는 최대 면수.
         */
        private baseFaces;
        /**
         * 필름가.
         *
         * 기본요금 구간면수를 초과한 초과 면적 / m² 에 곱해진다.
         */
        private filmPrice;
        /**
         * @inheritdoc
         */
        init(): void;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
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
        private _Compute_units(process);
        /**
         * 기본가격을 계산함.
         *
         * @param process 접지행위자
         * @return 기본가격
         */
        private _Compute_base_price(process);
        /**
         * 기본요금구간을 벗어난, 추가비용을 계산한다.
         *
         * @param process 접지행위자.
         * @return 초과요금
         */
        private _Compute_over_price(process);
        /**
         * 기본요금구간 면수를 벗어난, 초과면의 면적을 계산한다.
         *
         * @param process 접지행위자
         * @return 초과면적 총합
         */
        private _Compute_over_area(process);
        /**
         * @inheritdoc
         */
        computeSpareArea(process: Process): number;
        getBasePrice(): number;
        getBaseFaces(): number;
        getInkPrice(): number;
        setBasePrice(val: number): void;
        setBaseFaces(val: number): void;
        setInkPrice(val: number): void;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
        private _ToGridRows_area(process);
        protected toGridRows_sparePapers(process: Process): IPriceRow[];
    }
}
declare namespace bws.folding.core {
    /**
     * <p> 가격모형 리스트. </p>
     *
     * <p> 단가 산정에 필요한 가격모형 오브젝트들을 담아놓은 리스트. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class PriceModels extends protocol.Entity implements IPriceModel {
        /**
         * 인쇄 가격모형.
         */
        private print;
        /**
         * 박 가격모형.
         */
        private foil;
        /**
         * 스코딕스 가격모형.
         */
        private scodix;
        /**
         * 톰슨 가격모형.
         */
        private thomson;
        /**
         * 라미네이팅 가격모형.
         */
        private laminating;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        init(): void;
        /**
         * @inheritdoc
         */
        construct(xml: library.XML): void;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
        getPrint(): PrintModel;
        getFoil(): FoilModel;
        getScodix(): ScodixModel;
        getThomson(): ThomsonModel;
        getLaminating(): LaminatingModel;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        toXML(): library.XML;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
    }
}
declare namespace bws.folding.core {
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
    class PrintModel extends SideOptionalModel {
        /**
         * 작업비.
         */
        private workPrice;
        /**
         * 1단위 면 수량.
         */
        private workFaces;
        /**
         * 색상 1도에 따른 가격.
         */
        private ctpPrice;
        /**
         * 앞면의 색상코드
         */
        private frontSideColorCode;
        /**
         * 뒷면의 색상코드
         */
        private backSideColorCode;
        /**
         * @inheritdoc
         */
        init(): void;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
        /**
         * 작업비용 계산.
         */
        private _Compute_work_price(process);
        /**
         * CTP 가격 계산.
         */
        private _Compute_ctp_price(process);
        /**
         * 단위 수를 계산함.
         *
         * @param process 접지행위자
         * @return 단위 수
         */
        private _Compute_units(process);
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
        private _Compute_weighted_average_color_degree(process);
        /**
         * 앞/뒷면 색상코드의 교집합, 그 교집합의 원소 수를 계산함.
         *
         * @return 색상코드 교집합의 원소 수.
         */
        private _Compute_intersect_color_degree();
        getWorkPrice(): number;
        getWorkFaces(): number;
        getCTPPrice(): number;
        getFrontSideColorCode(): string;
        getBackSideColorCode(): string;
        setWorkPrice(val: number): void;
        setWorkFaces(val: number): void;
        setCTPPrice(val: number): void;
        setFrontSideColorCode(val: string): void;
        setBackSideColorCode(val: string): void;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
        private _ToGridRows_units(process);
    }
}
declare namespace bws.folding.core {
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
    class ScodixModel extends SideOptionalModel {
        /**
         * 작업비: 1,247.4 c,<sup>2</sup> (A3 면적) 당 가격
         */
        private feedingPrice;
        /**
         * 잉크비: 12.474cm<sup>2</sup> (A3 1% 면적) 당 가격
         */
        private inkPrice;
        /**
         * <p> (임시 변수) 이미지 면적 대비 스코딕스 사용률. </p>
         *
         * <p> 본래는 외부 프로그램과 연동하여, 실제 스코딕스를 행하는 면적을 계산하여야 한다. 하지만, 현재는
         * 이미지 면적 대비 스코딕스가 찍히는 비율을 입력받아, 이를 기초로 스코딕스 면적을 계산하고 있다.
         * {@link __inkAreaPercentage} 는 그 비율을 설정할 수 있는 변수이다. </p>
         */
        private inkAreaPercentage;
        /**
         * @inheritdoc
         */
        init(): void;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
        private _Compute_feeding_price(process);
        private _Compute_feeding_count(process);
        private _Compute_ink_price(process);
        private _Compute_ink_area(process);
        getFeedingPrice(): number;
        getInkPrice(): number;
        $getInkAreaPercentage(): number;
        setFeedingPrice(val: number): void;
        setInkPrice(val: number): void;
        $setInkAreaPercentage(val: number): void;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
    }
}
declare namespace bws.folding.core {
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
    class ThomsonModel extends OptionalModel {
        /**
         * 기본 비용 / 판면
         */
        private workBasePrice;
        /**
         * 기본 매수
         */
        private workBaseFaces;
        /**
         * 단위초과매수당 비용
         */
        private workOverPrice;
        /**
         * 칼비 / m²
         */
        private cuttingPrice;
        /**
         * (임시 변수) 현재 이미지가 필요로 하는 재단길이
         */
        private cuttingLength;
        /**
         * @inheritdoc
         */
        init(): void;
        /**
         * @inheritdoc
         */
        computePrice(process: Process): number;
        private _Compute_base_work_price(process);
        private _Compute_face_count(process);
        private _Compute_over_work_price(process);
        private _Compute_over_faces(process);
        private _Compute_cutting_price(process);
        getWorkUnitPrice(): number;
        getWorkUnitFaces(): number;
        getWorkSurplusPrice(): number;
        getCuttingPrice(): number;
        $getCuttingLength(): number;
        setWorkUnitPrice(val: number): void;
        setWorkUnitFaces(val: number): void;
        setWorkSurplusPrice(val: number): void;
        setCuttingPrice(val: number): void;
        $setCuttingLength(val: number): void;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        toGridRows(process: Process): IPriceRow[];
        private _ToGridRows_units(process);
    }
}
declare namespace bws.folding.core {
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
    class Process extends protocol.EntityArray<Placement> {
        /**
         * @hidden
         */
        private process_array_;
        /**
         * @hidden
         */
        private name;
        /**
         * @hidden
         */
        private device_;
        /**
         * @hidden
         */
        private image_;
        /**
         * @hidden
         */
        private paper_;
        /**
         * @hidden
         */
        private price_models_;
        /**
         * Construct from 공정 리스트.
         *
         * @param processArray 공정 리스트.
         */
        constructor(processArray: ProcessArray);
        /**
         * Copy Constructor.
         *
         * @param obj Object to copy.
         */
        constructor(obj: Process);
        /**
         * @inheritdoc
         */
        construct(xml: library.XML): void;
        /**
         * @inheritdoc
         */
        createChild(xml: library.XML): Placement;
        /**
         * @hidden
         */
        private _Create_virtual_paper_size(pages);
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
        optimize(): void;
        /**
         * @hidden
         */
        private _Explore_placements(placements, side, left_pages, first?);
        /**
         * @hidden
         */
        private _Explore_subtract_placements(placements, left_pages);
        /**
         * @hidden
         */
        private _Explore_inverse_placements(placements, left_pages);
        /**
         * @hidden
         */
        private _Explore_plaste_placements(placements, side, left_pages);
        /**
         * @hidden
         */
        private _Erase_empty_placements();
        /**
         * Get 공정 리스트.
         */
        getProcessArray(): ProcessArray;
        /**
         * Get 공정명.
         */
        getName(): string;
        /**
         * Get 오프셋 장치.
         */
        getDevice(): Device;
        /**
         * Get 이미지.
         */
        getImage(): Image;
        /**
         * Get 선택된 용지 모형.
         */
        getPaper(): PaperModel;
        /**
         * Get 가격모형 리스트.
         */
        getPriceModels(): PriceModels;
        /**
         * 접지에 사용할 용지 모형을 정함.
         */
        setPaper(val: PaperModel): void;
        /**
         * @hidden
         */
        private _Compute_placements();
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
        validate(): std.List<string>;
        /**
         * @hidden
         */
        private _Validate_optimization();
        /**
         * 현 조판 공정의 양-단면 여부를 계산함.
         *
         * 인쇄 공정을 기준으로 하여 양-단면 여부를 판별한다.
         *
         * @return 양단면 코드.
         */
        computeSide(): Side;
        /**
         * 최종 가격을 계산함.
         */
        computePrice(): number;
        /**
         * 사용하게 될 판면의 수
         *
         * 한 부 내에서 쓰이는 판면 수만을 의미한다.
         * 전체 사본 부수와 돈땡 및 판걸이를 반영한 판면 수가 아님.
         */
        computeFaceCount(): number;
        /**
         * @hidden
         */
        /**
         * @hidden
         */
        $name: string;
        /**
         * @hidden
         */
        readonly $page: string;
        /**
         * @hidden
         */
        readonly $copies: string;
        /**
         * @hidden
         */
        readonly $price: string;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        CHILD_TAG(): string;
        /**
         * @inheritdoc
         */
        toXML(): library.XML;
    }
}
declare namespace bws.folding.core {
    /**
     * <p> 공정 리스트. </p>
     *
     * <p> ProcessArray 는 개별 공정 Process 를 리스트로 지니는 클래스이다. 자식 객체 Process 들을
     * Composition 관계로 지니는 것에 더불어, 종이모형 리스트 PaperModelArray 를 가지고 있다. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class ProcessArray extends protocol.EntityArrayCollection<Process> {
        /**
         * @hidden
         */
        private paper_array_;
        /**
         * @hidden
         */
        private cutter_;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        construct(xml: library.XML): void;
        /**
         * @inheritdoc
         */
        createChild(xml: library.XML): Process;
        /**
         * 멤버변수 초기화.
         */
        init(): void;
        /**
         * 최적화를 행함.
         */
        optimize(): void;
        /**
         * Get 종이모형 리스트.
         */
        getPaperArray(): PaperModelArray;
        /**
         * Get 재단기.
         */
        getCutter(): Cutter;
        /**
         * 최종 가격을 계산함.
         */
        computePrice(): number;
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
        validate(): std.HashSet<string>;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        CHILD_TAG(): string;
        /**
         * @inheritdoc
         */
        toXML(): library.XML;
    }
}
declare namespace bws.folding {
    /**
     * 각 페이지의 조판 내 좌표를 표기하기 위한 인터페이스
     */
    interface IPoint {
        /**
         * X 좌표.
         */
        x: number;
        /**
         * Y 좌표.
         */
        y: number;
    }
    /**
     * 각 페이지의 조판 내 좌표와 크기를 표기하기 위한 인터페이스
     */
    interface IRectangle extends IPoint {
        /**
         * 가로 길이.
         */
        width: number;
        /**
         * 세로 길이.
         */
        height: number;
    }
}
declare namespace bws.folding.core {
    /**
     * Placement 내 각 페이지의 배치 정보.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Wrap {
        /**
         * @hidden
         */
        private placement_;
        /**
         * @hidden
         */
        private row_;
        /**
         * @hidden
         */
        private col_;
        /**
         * Construct from a Placement.
         *
         * @param placement 소속 배치정보 객체.
         */
        constructor(placement: Placement);
        /**
         * Initializer Constructor.
         *
         * @param placement 소속 배치정보 객체.
         * @param row 행 번호.
         * @param col 열 번호.
         */
        constructor(placement: Placement, row: number, col: number);
        /**
         * Get 소속 조판면 배치정보 객체.
         */
        getPlacement(): Placement;
        /**
         * 행 번호.
         */
        row(): number;
        /**
         * 열 번호.
         */
        col(): number;
        /**
         * @hidden
         */
        private _Compute_folding_direction();
        /**
         * 이미지가 배치되는 영역 Rectangle 을 계산함.
         */
        computeSector(): IRectangle;
        /**
         * 이미지의 여백을 둘러싼 영역 Rectangle 을 계산함.
         */
        computeMargin(): IRectangle;
        /**
         * 이미지가 배치되는 좌표를 계산함.
         */
        computePoint(): IPoint;
    }
}

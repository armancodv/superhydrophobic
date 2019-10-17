class Model {
    constructor() {
        this.version = '4.0.0';
        this.package = 'com.armanco.superhydrophobic';
        this.homepage = 'https://arman.co.com/';
        this.api = 'https://arman.co.com/api/applist_formula.php';
        this.bannerId = 'ca-app-pub-4301546764905932/6876653944';
        this.interstitialId = 'ca-app-pub-4301546764905932/9547629874';
        this.title = 'Superhydrophobic';
        this.subTitle = '';
        this.description = '';
        this.page = 1;
        this.category = 0;

        this.categoriesTitles = ['Relations'];
        this.categoriesThumbs = ['rel'];

        this.categoryTitles = [
            ['Young', 'Wenzel', 'Cassie-Baxter']
        ];

        this.calculatorsTitles = ['Young\'s Relation', 'Wenzel', 'Cassie-Baxter'];
        this.calculatorsThumbs = ['Y', 'W', 'CB'];

        this.inputsTitles = [
            ['γ_sg','γ_sl','γ_lg'],
            ['θ', 'r'],
            ['θ', 'φ']
        ];

        this.inputsSigns = [
            ['', '', ''],
            ['', ''],
            ['', '']
        ];

        this.outputsTitles = [
            ['Contact Angle'],
            ['Apparent Contact Angle'],
            ['Apparent Contact Angle']
        ];

        this.outputsSigns = [
            ['θ °'],
            ['θ* °'],
            ['θ* °']
        ];

        this.inputs = {};
        this.outputs = {};
        this.calculator = 0;
    }

    calculate() {
        if (this.calculator === 0) {
            let t_sg = this.inputs[0];
            let t_sl = this.inputs[1];
            let t_lg = this.inputs[2];
            let theta = Math.round(Math.acos((t_sg-t_sl)/t_lg) * 1000000 * 180 / Math.PI) / 1000000;
            this.outputs = [theta];
        } else if (this.calculator === 1) {
            let theta = this.inputs[0] * Math.PI / 180;
            let r = this.inputs[1];
            let thetaS = Math.round(Math.acos(r*Math.cos(theta)) * 1000000 * 180 / Math.PI) / 1000000;
            this.outputs = [thetaS];
        } else if (this.calculator === 2) {
            let theta = this.inputs[0] * Math.PI / 180;
            let phi = this.inputs[1];
            let thetaS = Math.round(Math.acos(phi*(Math.cos(theta)+1)-1) * 1000000 * 180 / Math.PI) / 1000000;
            this.outputs = [thetaS];
        }
    };

    changeCategory(number) {
        this.category = number;
    }

    changeCalculator(number) {
        this.calculator = number;
        this.inputs = [];
        this.outputs = [];
    }

    changePage(page) {
        this.page = page;
    }

    getApps() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.api + '?p=' + this.package);
        xhr.send();
        xhr.onload = () => {
            this.apps = JSON.parse(xhr.response);
        };
    }


};

class View {
    constructor() {
        this.menu = document.getElementById('menu');
        this.items = document.getElementById('items');
        this.apps = document.getElementById('apps');
        this.categoryTitle = document.getElementById('page3-h1');
        this.calculatorTitle = document.getElementById('page2-h1');
        this.calculatorImage = document.getElementById('page2-image');
        this.inputs = document.getElementById('inputs');
        this.outputs = document.getElementById('outputs');
        this.title = document.getElementById('title');
        this.subTitle = document.getElementById('subtitle');
        this.description = document.getElementById('description');
        this.armanco = document.getElementById('armanco');
        this.versions = Array.from(document.getElementsByClassName('version'));
        this.backs = Array.from(document.getElementsByClassName('back'));
    }

    openLink(link) {
        window.open(link, '_system');
    }

    changePage(page_number) {
        window.location.hash = '#page' + page_number;
        for (let i = 1; i <= 5; i++) {
            if (i === page_number) {
                document.getElementById('page' + i).style.display = 'block';
            } else {
                document.getElementById('page' + i).style.display = 'none';
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    addMenuItem(id, thumb, title) {
        let element = `<table id="${id}" class="property" cellpadding="0" cellspacing="0"><tr><td class="property-thumb">${thumb}</td><td class="property-name">${title}</td></tr></table>`;
        this.menu.insertAdjacentHTML("beforeend", element);
    }

    addMenuItemCalculator(id, thumb, title) {
        let element = `<table id="${id}" class="property2" cellpadding="0" cellspacing="0"><tr><td class="property2-thumb">${thumb}</td><td class="property2-name">${title}</td></tr></table>`;
        this.menu.insertAdjacentHTML("beforeend", element);
    }

    addMenuItemMute(id, thumb, title) {
        let element = `<table id="${id}" class="about" cellpadding="0" cellspacing="0"><tr><td class="about-thumb">${thumb}</td><td class="about-name">${title}</td></tr></table>`;
        this.menu.insertAdjacentHTML("beforeend", element);
    }

    addMenuItemApp(item) {
        let element = `<table class="app" cellpadding="0" cellspacing="0" id="app${item.name}"><tr><td class="app-thumb" style="background-image: url('${item.image}')"></td><td class="app-detail"><span class="app-name">${item.name}</span><br><span class="app-price">${item.price}</span><br><span class="app-description">${item.description}</span></td></tr></table>`;
        this.apps.insertAdjacentHTML("beforeend", element);
    }

    addFormula(id, src) {
        let element = `<img src="${src}" style="max-width:100%"><br>`;
        let place = Array.from(document.getElementById(id).getElementsByClassName('identity-formula'));
        place[0].insertAdjacentHTML("beforeend", element);
    }

    addItem(id, title) {
        let element = `<table id="${id}" class="identity" cellpadding="0" cellspacing="0"><tr><td class="identity-title">${title}</td></tr><tr><td class="identity-formula"></td></tr></table>`;
        this.items.insertAdjacentHTML("beforeend", element);
    }

    addInput(i, title, sign) {
        let element = `<table class="input" cellpadding="0" cellspacing="0"><tr><td class="input-lable">${title}<br><span class="input-sign">${sign}</span></td><td class="input-value"><input id="input${i}" type="number" step="0.0000000001" min="-9999999999999999999999999999999999999999" max="9999999999999999999999999999999999999999"></td></tr></table>`;
        this.inputs.insertAdjacentHTML("beforeend", element);
    }

    addOutput(i, title, sign) {
        let element = `<table class="converted" cellpadding="0" cellspacing="0"><tr><td class="converted-unit-fa">${title}</td></tr><tr><td class="converted-unit">${sign}</td></tr><tr><td class="converted-value"><span id="output${i}"></span></td></tr></table>`;
        this.outputs.insertAdjacentHTML("beforeend", element);
    }

    changeCalculatorImage(i) {
        this.calculatorImage.style.background = `url('images/calculators/${i + 1}.png') no-repeat center`;
        this.calculatorImage.style.backgroundSize = 'contain';
    }

    changeTitle(title) {
        this.title.innerHTML = title;
    }

    changeSubTitle(subTitle) {
        this.subTitle.innerHTML = subTitle;
    }

    changeCategoryTitle(categoryTitle) {
        this.categoryTitle.innerHTML = categoryTitle;
    }

    changeCalculatorTitle(calculatorTitle) {
        this.calculatorTitle.innerHTML = calculatorTitle;
    }

    changeDescription(description) {
        this.description.innerHTML = description;
    }

    changeOutputs(outputs) {
        for (let key in outputs) {
            document.getElementById(`output${key}`).innerHTML = outputs[key];
        }
    }

    changeVersion(version) {
        this.versions.forEach(element => {
            element.innerHTML = version;
        });
    }

    deleteChild(id) {
        let place = document.getElementById(id);
        place.innerHTML = "";
    }

};

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
        this.ready();
    }

    init() {
        window.addEventListener("load", () => {
            this.view.changeTitle(this.model.title);
            this.view.changeSubTitle(this.model.subTitle);
            this.view.changeVersion(this.model.version);
            this.view.changeDescription(this.model.description);
            this.model.getApps();
            for (let i = 0; i < this.model.calculatorsTitles.length; i++) {
                let thumb = this.model.calculatorsThumbs[i];
                let title = this.model.calculatorsTitles[i];
                this.addMenuItemCalculator(i, thumb, title);
            }
            for (let i = 0; i < this.model.categoriesTitles.length; i++) {
                let thumb = this.model.categoriesThumbs[i];
                let title = this.model.categoriesTitles[i];
                this.addMenuItem(i, thumb, title);
            }
            this.addMenuItemMute('menua', 'apps', 'Similar Apps', 4);
            this.addMenuItemMute('menui', 'info', 'About', 5);
            document.addEventListener("backbutton", e => {
                if (this.model.page !== 1) {
                    e.preventDefault();
                    this.changePage(1);
                } else {
                    navigator.app.exitApp();
                }
            }, false);
            this.view.backs.forEach(element => {
                element.addEventListener("click", () => {
                    this.changePage(1);
                });
            });
            this.view.armanco.addEventListener("click", () => {
                this.view.openLink(this.model.homepage);
            });

        }, false);

    }

    ready() {
        document.addEventListener("deviceready", () => {
            admob.banner.config({
                id: this.model.bannerId,
                isTesting: false,
                autoShow: true
            });
            admob.banner.prepare();
            admob.interstitial.config({
                id: this.model.interstitialId,
                isTesting: false,
                autoShow: true
            });
            }, false);
    }

    changePage(page) {
        this.model.changePage(page);
        this.view.changePage(page);
    }

    async addMenuItemCalculator(i, thumb, title) {
        let id = `menucal${i}`;
        await this.view.addMenuItemCalculator(id, thumb, title);
        document.getElementById(id).addEventListener("click", async () => {
            await this.view.deleteChild('inputs');
            await this.view.deleteChild('outputs');
            this.model.changeCalculator(i);
            this.view.changeCalculatorTitle(title);
            this.view.changeCalculatorImage(i);
            for (let j = 0; j < this.model.outputsTitles[i].length; j++) {
                await this.view.addOutput(j, this.model.outputsTitles[i][j], this.model.outputsSigns[i][j]);
            }
            for (let j = 0; j < this.model.inputsTitles[i].length; j++) {
                await this.view.addInput(j, this.model.inputsTitles[i][j], this.model.inputsSigns[i][j]);
                let element = document.getElementById(`input${j}`);
                element.addEventListener("input", async () => {
                    this.model.inputs[j] = await element.value;
                    await this.model.calculate();
                    this.view.changeOutputs(this.model.outputs);
                });
            }
            this.changePage(2);
        });
    }

    async addMenuItem(i, thumb, title) {
        let id = `menu${i}`;
        await this.view.addMenuItem(id, thumb, title);
        document.getElementById(id).addEventListener("click", async () => {
            this.model.changeCategory(i);
            this.view.changeCategoryTitle(title);
            await this.view.deleteChild('items');
            for (let j = 0; j < this.model.categoryTitles[i].length; j++) {
                await this.view.addItem(`item${j}`, this.model.categoryTitles[i][j]);
                this.view.addFormula(`item${j}`, `images\\${i + 1}\\${j + 1}.png`);
            }
            this.changePage(3);
        });
    }

    async addMenuItemMute(id, thumb, title, page) {
        await this.view.addMenuItemMute(id, thumb, title);
        document.getElementById(id).addEventListener("click", async () => {
            if (page === 4) {
                await this.view.deleteChild('apps');
                this.model.apps.forEach(async element => {
                    await this.view.addMenuItemApp(element);
                    document.getElementById(`app${element.name}`).addEventListener("click", () => {
                        this.view.openLink(element.url);
                    });
                });
            }
            this.changePage(page);
            admob.interstitial.prepare();
        });
    }
};

const app = new Controller(new Model(), new View());
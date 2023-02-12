import { productsURL } from '../lib';

const prefix = '🐉 ';

type ProductType = {
  id: number;
  name: string;
  icon?: string;
};

//les Asynchronous Functions
export default async function updateOutput(id: string) {
  const products = await getProducts();
  const broodje = document.querySelector(`#${id}`);
  // de id is updateOutput id en deze zie je in index.ts terug
  //namelijk output. Ik heb zelf in deze file output even gewijzigd in broodje, maakt niks uit.
  const html = layoutProducts(products);

  if (broodje && html) {
    broodje.innerHTML = html;
  }
}
//les Destrutering Parameters stukje hieronder t/m ${name}
function layoutProducts(products: ProductType[]) {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
    <span class="card-id">#${id}</span>
      <i class="card-icon ${icon} fa-lg"></i>
    <span class="card-name">${name}</span>
    `;
    const cardHtml = `
    <li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}

//Les defining functions en Les Retrun values and Types
async function getProducts(): Promise<ProductType[]> {
  const response: Response = await fetch(productsURL);
  const products: ProductType[] = await response.json(); //omdat json een Promise is (zie je wanneer je er boven hangt moet ook deze een await hebben)
  return products;
}
//run our samples
runLearningSamples();
//hiosted

function runLearningSamples() {
  function displayProductInfo(id: number, name: string) {
    console.log(`${prefix} typed parameters`);
    console.log(`product id=${id} and name=${name}`);
  }
  displayProductInfo(10, 'pizza');
  displayProductInfo(10, 'Pizaa, 1, John');

  console.log(`${prefix}function declaration`);
  console.log(addNumbersDeclaration(7, 11));

  //hieronder is een declaration > dus WEL hoisting, dus de
  // output kan zowel VOOR als NA de declaratie worden opgeroepen
  function addNumbersDeclaration(x: number, y: number) {
    const sum: number = x + y;
    return sum;
  }

  //hieronder is een expression > dus GEEN hoisting, dus de
  // output moet NA de expressie worden opgeroepen
  const addNumbersExpression = function (x: number, y: number) {
    const sum: number = x + y;
    return sum;
  };
  console.log(`${prefix}function expression`);
  console.log(addNumbersExpression(7, 11));

  const sampleProducts = [
    { id: 10, name: 'pizza', icon: 'whatever' },
    { id: 20, name: 'Ice', icon: 'icecream' },
    { id: 30, name: 'Cheese', icon: 'kaas' },
  ];

  function getProductNames(): string[] {
    return sampleProducts.map((p) => p.name);
  }
  console.log(`${prefix} return array`);
  console.log(getProductNames());

  function getProductByID(id: number): ProductType | undefined {
    return sampleProducts.find((p) => id === p.id);
  }
  console.log(`${prefix} return ProducType`);
  console.log(getProductByID(10));

  function displayProducts(products: ProductType[]): void {
    const productNames = products.map((p) => {
      const name = p.name.toLowerCase();
      return name;
    });
    const msg = `Sample products include: ${productNames.join(' , ')}`;
    console.log(`${prefix} return void`);
    console.log(msg);
  }
  displayProducts(sampleProducts);
  //Les optional Parameters
  const getRandomInt = (max: number) => Math.floor(Math.random() * max); //floor is altijd naar beneden afronden

  function createProduct(name: string, icon?: string | undefined): ProductType {
    const id = getRandomInt(1000);
    return { id, name, icon };
  }
  console.log(`${prefix} optional parameters`);
  let pinapple = createProduct('pineapple', 'pinapple.jpg');
  let mango = createProduct('mango');
  console.log(pinapple, mango);

  //Les Default Parameters
  const getRandomIntDefault = (max: number = 1000) =>
    Math.floor(Math.random() * max); //geven default 1000
  // een betere destucture manier om het te schrijven (zie les Parameter Destructering)> zie hieronder
  //const {floor, random} =Math
  //const getRandomInt = (max: number = 1000) => floor(random()*max);

  function createProductWithDefaults(
    name: string,
    icon: string = 'generic-fruit.jpg',
  ): ProductType {
    const id = getRandomIntDefault();
    return { id, name, icon };
  }
  console.log(`${prefix} default parameters`);
  let pinappleDefault = createProductWithDefaults('pineapple', 'pinapple.jpg');
  let mangoDefault = createProductWithDefaults('mango');
  console.log(pinappleDefault, mangoDefault);

  //Les restparameters
  function buildAddress(
    street: string,
    city: string,
    ...restOfAddress: string[]
  ) {
    const address = `${street} ${city} ${restOfAddress.join('-')}`;
    return address;
  }
  const someAddress = buildAddress(
    '1 lois lane',
    'smallCity',
    'rest1', //rest arg[0]
    'rest2', //rest arg[1]
    'etc...', //rest arg[2]
  );
  console.log(`${prefix} Restparameters`);
  console.log(someAddress);

  //Les Parameter Destructuring > zie versciil displayProduct (voor destucturen) en
  //displayProductDes (na Desturturing)

  function displayProduct(product: ProductType): void {
    console.log(`${prefix} Voor Destructuring Parameters`);
    console.log(`Product id=${product.id} and name${product.name}`);
  }
  const prod = getProductByID(10);
  if (prod) {
    displayProduct(prod);
  }
  // door te destructeren kan je bovenstaande schrijven als
  function displayProductDes({ id, name }: ProductType): void {
    console.log(`${prefix} Destructuring Parameters`);
    console.log(`Product id=${id} and name${name}`);
  }
  const prodDes = getProductByID(20);
  if (prodDes) {
    displayProductDes(prodDes);
  }
}

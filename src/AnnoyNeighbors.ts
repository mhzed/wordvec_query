import {VecNeighbors, VecNeighborEntry} from "./VecNeighbors";
import * as _ from 'lodash';
import {Readable} from "stream";
import {asyncIterateStream} from "async-iterate-stream";
import * as byline from 'byline';
const Annoy = require("annoy");

export interface AnnoyIndexProperty {
  dimension?: number,
  method: string,
  ntrees: number
}

export class AnnoyNeighbors implements VecNeighbors {
  private index;
  private search_k = 10000;
  public property : AnnoyIndexProperty = { 
    dimension: 0, 
    method: "Angular", 
    ntrees: 0   // let lib decide
  };
  
  constructor(prop?: AnnoyIndexProperty) {
    if (prop) this.property = _.assign(this.property, prop);
  };
  
  public saveAs(base:string) : void {
    let p = this.property;
    this.index.save(`${base}.${p.dimension}.${p.method}.${p.ntrees}.annoy`);
  }
  public static loadAs(indexFile: string) :AnnoyNeighbors {
    let ret = new AnnoyNeighbors();
    let [base, dimension, method, ntrees] = (/.(\w+).(\w+).(\w+).annoy/i).exec(indexFile);
    base=undefined;
    ret.property = {dimension : parseInt(dimension), method, ntrees: parseInt(ntrees)};
    ret.index = new Annoy(ret.property.dimension, ret.property.method);
    ret.index.load(indexFile);
    return ret;
  }

  public createIndex(dimension: number) {
    this.property.dimension = dimension;
    this.index = new Annoy(this.property.dimension, this.property.method);
  }
  public addItemToIndex(id: number, vec: number[]) {
    this.index.addItem(id, vec);
  }
  public buildIndex() {
    if (this.property.ntrees) this.index.build(this.property.ntrees);
    else this.index.build();
  }

  // load index
  public static loadIndex(indexFile: string, prop: AnnoyIndexProperty) :AnnoyNeighbors {
    let ret = new AnnoyNeighbors();
    ret.property = prop;
    ret.index = new Annoy(ret.property.dimension, ret.property.method);
    ret.index.load(indexFile);
    return ret;
  }
  
  async knn(vector: number[], k: number) : Promise<VecNeighborEntry[]> {
    let ret : VecNeighborEntry[] = [];    
    let {neighbors, distances} = this.index.getNNsByVector(vector, k, this.search_k, true);
    for (let i=0; i<neighbors.length; i++) {
      let id = neighbors[i];
      let dist = distances[i];
      ret.push({id, dist})
    }
    return ret;
  }
  
  setSearchK(k: number) {
    this.search_k = k;
  }
} 


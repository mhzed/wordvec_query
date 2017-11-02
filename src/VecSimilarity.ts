export interface VecSimilarityEntry {
  id: number,
  dist: number
};

export interface VecSimilarity {
  /**
   * Get k nearest neighbours from vector
   * 
   * @param {number[]} vector
   * @param {number} k
   * @returns {VecSimilarityEntry[]}
   */
  knn(vector: number[], k: number) : Promise<VecSimilarityEntry[]>;
}
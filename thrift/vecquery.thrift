// docker run -v (pwd):/data --rm mhzed/thrift --gen js:ts -o /data /data/vecquery.thrift

struct WordEntry {
  1: required string word ;
  2: required double dist ;   // the distance to the word being queried on, if there is one  
  3: required list<double> vector ;  
}
typedef list<WordEntry> WordEntryList

exception VecQueryException {
    1: string message;
}

service WordvecQueryService {
  
  WordEntryList knnQuery(1: required i32 k,            // k as in k-NN
                         2: required string word)      // word to query about
      throws (1: VecQueryException err);

  WordEntryList knnQueryOnVector(1: required i32 k,            // k as in k-NN
                         2: required list<double> vector)      // word to query about
      throws (1: VecQueryException err);

  WordEntryList knnQueryOnExpression(1: required i32 k,            // k as in k-NN
                         2: required string expression)      // expression to calculate
      throws (1: VecQueryException err);
  
  WordEntry findVec(1: required string word)
      throws (1: VecQueryException err);

}

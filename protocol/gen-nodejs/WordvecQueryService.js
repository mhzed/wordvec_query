//
// Autogenerated by Thrift Compiler (0.10.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./vecquery_types');
//HELPER FUNCTIONS AND STRUCTURES

var WordvecQueryService_knnQuery_args = function(args) {
  this.k = null;
  this.word = null;
  if (args) {
    if (args.k !== undefined && args.k !== null) {
      this.k = args.k;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field k is unset!');
    }
    if (args.word !== undefined && args.word !== null) {
      this.word = args.word;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field word is unset!');
    }
  }
};
WordvecQueryService_knnQuery_args.prototype = {};
WordvecQueryService_knnQuery_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.k = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.word = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

WordvecQueryService_knnQuery_args.prototype.write = function(output) {
  output.writeStructBegin('WordvecQueryService_knnQuery_args');
  if (this.k !== null && this.k !== undefined) {
    output.writeFieldBegin('k', Thrift.Type.I32, 1);
    output.writeI32(this.k);
    output.writeFieldEnd();
  }
  if (this.word !== null && this.word !== undefined) {
    output.writeFieldBegin('word', Thrift.Type.STRING, 2);
    output.writeString(this.word);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var WordvecQueryService_knnQuery_result = function(args) {
  this.success = null;
  this.err = null;
  if (args instanceof ttypes.VecQueryException) {
    this.err = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [ttypes.WordEntry]);
    }
    if (args.err !== undefined && args.err !== null) {
      this.err = args.err;
    }
  }
};
WordvecQueryService_knnQuery_result.prototype = {};
WordvecQueryService_knnQuery_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.success = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = new ttypes.WordEntry();
          elem14.read(input);
          this.success.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.err = new ttypes.VecQueryException();
        this.err.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

WordvecQueryService_knnQuery_result.prototype.write = function(output) {
  output.writeStructBegin('WordvecQueryService_knnQuery_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter15 in this.success)
    {
      if (this.success.hasOwnProperty(iter15))
      {
        iter15 = this.success[iter15];
        iter15.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.err !== null && this.err !== undefined) {
    output.writeFieldBegin('err', Thrift.Type.STRUCT, 1);
    this.err.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var WordvecQueryService_findVec_args = function(args) {
  this.word = null;
  if (args) {
    if (args.word !== undefined && args.word !== null) {
      this.word = args.word;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field word is unset!');
    }
  }
};
WordvecQueryService_findVec_args.prototype = {};
WordvecQueryService_findVec_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.word = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

WordvecQueryService_findVec_args.prototype.write = function(output) {
  output.writeStructBegin('WordvecQueryService_findVec_args');
  if (this.word !== null && this.word !== undefined) {
    output.writeFieldBegin('word', Thrift.Type.STRING, 1);
    output.writeString(this.word);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var WordvecQueryService_findVec_result = function(args) {
  this.success = null;
  this.err = null;
  if (args instanceof ttypes.VecQueryException) {
    this.err = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.WordEntry(args.success);
    }
    if (args.err !== undefined && args.err !== null) {
      this.err = args.err;
    }
  }
};
WordvecQueryService_findVec_result.prototype = {};
WordvecQueryService_findVec_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.WordEntry();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.err = new ttypes.VecQueryException();
        this.err.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

WordvecQueryService_findVec_result.prototype.write = function(output) {
  output.writeStructBegin('WordvecQueryService_findVec_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.err !== null && this.err !== undefined) {
    output.writeFieldBegin('err', Thrift.Type.STRUCT, 1);
    this.err.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var WordvecQueryServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
WordvecQueryServiceClient.prototype = {};
WordvecQueryServiceClient.prototype.seqid = function() { return this._seqid; };
WordvecQueryServiceClient.prototype.new_seqid = function() { return this._seqid += 1; };
WordvecQueryServiceClient.prototype.knnQuery = function(k, word, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_knnQuery(k, word);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_knnQuery(k, word);
  }
};

WordvecQueryServiceClient.prototype.send_knnQuery = function(k, word) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('knnQuery', Thrift.MessageType.CALL, this.seqid());
  var args = new WordvecQueryService_knnQuery_args();
  args.k = k;
  args.word = word;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

WordvecQueryServiceClient.prototype.recv_knnQuery = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new WordvecQueryService_knnQuery_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.err) {
    return callback(result.err);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('knnQuery failed: unknown result');
};
WordvecQueryServiceClient.prototype.findVec = function(word, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_findVec(word);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_findVec(word);
  }
};

WordvecQueryServiceClient.prototype.send_findVec = function(word) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('findVec', Thrift.MessageType.CALL, this.seqid());
  var args = new WordvecQueryService_findVec_args();
  args.word = word;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

WordvecQueryServiceClient.prototype.recv_findVec = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new WordvecQueryService_findVec_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.err) {
    return callback(result.err);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('findVec failed: unknown result');
};
var WordvecQueryServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler;
}
;
WordvecQueryServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}
;
WordvecQueryServiceProcessor.prototype.process_knnQuery = function(seqid, input, output) {
  var args = new WordvecQueryService_knnQuery_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.knnQuery.length === 2) {
    Q.fcall(this._handler.knnQuery, args.k, args.word)
      .then(function(result) {
        var result_obj = new WordvecQueryService_knnQuery_result({success: result});
        output.writeMessageBegin("knnQuery", Thrift.MessageType.REPLY, seqid);
        result_obj.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result;
        if (err instanceof ttypes.VecQueryException) {
          result = new WordvecQueryService_knnQuery_result(err);
          output.writeMessageBegin("knnQuery", Thrift.MessageType.REPLY, seqid);
        } else {
          result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("knnQuery", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.knnQuery(args.k, args.word, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined') || err instanceof ttypes.VecQueryException) {
        result_obj = new WordvecQueryService_knnQuery_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("knnQuery", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("knnQuery", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
WordvecQueryServiceProcessor.prototype.process_findVec = function(seqid, input, output) {
  var args = new WordvecQueryService_findVec_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.findVec.length === 1) {
    Q.fcall(this._handler.findVec, args.word)
      .then(function(result) {
        var result_obj = new WordvecQueryService_findVec_result({success: result});
        output.writeMessageBegin("findVec", Thrift.MessageType.REPLY, seqid);
        result_obj.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result;
        if (err instanceof ttypes.VecQueryException) {
          result = new WordvecQueryService_findVec_result(err);
          output.writeMessageBegin("findVec", Thrift.MessageType.REPLY, seqid);
        } else {
          result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("findVec", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.findVec(args.word, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined') || err instanceof ttypes.VecQueryException) {
        result_obj = new WordvecQueryService_findVec_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("findVec", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("findVec", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};

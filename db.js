let fs = require('fs');
class Db {
    constructor(file) {
        this.path = file;
        if (!fs.existsSync(file)) {
            try {
                fs.writeFileSync(file, "{}", (err) => {
                    if (err) {
                        throw err;
                    }
                });
            } catch (err){
                console.log(err)
            }
        }
        this._value = JSON.parse(fs.readFileSync(file, "utf8"));
        this.saveOnChangeBool = true;
        var genProxy=data=>new Proxy(data,{
            set:(obj,prop,val)=>{
                obj[prop] = val;
              this.value
                if(this.saveOnChangeBool){
                    this.update();
                }
            },
            get:(obj,prop)=>{
                return genProxy(obj[prop])
            }
        })
        this.value=new Proxy(this._value,autosave)
    }

    exist(index) {
        if (!this._value[index]) {
            return (false);
        } else {
            return (true);
        }
    }

    update() {
        fs.writeFileSync(this.path, JSON.stringify(this._value, null, '\t'));
        return (this._value);
    }

    add(index, _value) {
        if (!this.exist(index)) {
            this._value[index] = _value;
        } else {
            return (false);
        }
        if (this.saveOnChangeBool) {
            return (this.update()[index]);
        } else {
            return (_value)
        }
    }

    remove(index) {
        this._value.splice(index, 1);
        return (undefined);
    }

    addOverWrite(index, _value) {
        this._value[index] = _value;
        if (this.saveOnChangeBool) {
            return (this.update(this._value)[index]);
        } else {
            return (_value)
        }
    }
}
module.exports = Db;

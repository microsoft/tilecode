namespace tileWorldEditor {

    // visitor

    // let Boulder = 0 // range 0-F
    // R[0 - F]\n
    // - G[-LRUD][-LRUD][ENA][0 - F] *\n
    // - CMS[-LRUD]
    // - CMO[-LRUD][-LRUD]
    // - CPS[0 - F]
    // - CPO[-LRUD][0 - F]
    // - X

    type ids = (id: number) => void
    type guard = (dir: string, dir2: string, op: string) => void

    function getHex(s: string, i: number){
        let c = s.charCodeAt(i)
        let n = -1
        if (48 <= c && c <= 57)
            n = c - 48
        if (65 <= c && c <= 70)
            n = 10 + (c - 65)
        return n
    }

    function getIds(s: string, i: number, gotId: ids) {
        if (i < 0)
            return i;
        while (i < s.length && s[i] != 'X') {
            let h = getHex(s, i)
            if (h == -1) { return -1 }
            gotId(h);
            i++
        }
        return i;
    }

    export class RuleVisitor {
        private index = 0;
        private guard = -1;
        private fail() { this.index = -1;  }
        constructor(private rule: string) {

        }

        private ok(i: number) {
            return i< this.rule.length
        }

        public getHeader() {
            if (this.rule[0] != 'R')
                this.index = -1
        }

        public getGuard(g: guard, k: ids) {
            if (this.guard == -1)
                return;
            if (this.ok(this.guard) && this.rule[this.guard] == 'G' && this.ok(this.guard+3)) {
                g(this.rule[this.guard+1], this.rule[this.guard+2], this.rule[this.guard+3])
                this.guard += 4;
                this.guard = getIds(this.rule, this.guard, k)
                this.guard++;
            } else {
                this.guard = -1;
            }
        }
    }
}
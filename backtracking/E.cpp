// #include <bits/stdc++.h>
#include <iostream>
#include <vector>
#include <fstream>
#include <queue>
#include <stack>
#include <string>

using namespace std;

bool check(vector<string> *s) {
		
    stack<string> q;
    int i = 0;
    int n = s->size();

    for ( i = 0; i < n; i++ ) {
        string c = s->at(i);

        if ( c[0] == ')' || c[0] == ']' ) {
            
            if ( !q.size() ) {
                return false;
            }

            if ( c[0] == ')' && q.top()[0] == '(' || c[0] == ']' && q.top()[0] == '[') {
                q.pop();
            } else {
                return false;
            }
        } else {
            q.push(c);
        }
    }

    return q.size() == 0;
}

string concatenateFromStack(vector<string> *charStack) {
    string result;

    for ( auto &c : *charStack ) {
        result += c;
    }

    return result;
}

void subgen(vector<string> *result, vector<string> *cur, int openC, int closedC, int openS, int closedS, int n) {
    if (cur->size() == n) {
        string str = concatenateFromStack(cur);
        if (openC == closedC && openS == closedS ) {
            if ( check(cur) ) {
                result->push_back(str);
            }
        }
        return;
    }

    if (openC + openS < n >> 1) {
        cur->push_back("(");
        subgen(result, cur, openC + 1, closedC, openS, closedS, n);
        cur->pop_back();
    }

    if (openS + openC < n >> 1) {
        cur->push_back("[");
        subgen(result, cur, openC, closedC, openS + 1, closedS, n);
        cur->pop_back();
    }

    if (cur->size() && closedS < openS && cur->at(cur->size()-1) != "(") {
        
        cur->push_back("]");
        subgen(result, cur, openC, closedC, openS, closedS + 1, n);
        cur->pop_back();
    
    }

    if (cur->size() && closedC < openC && cur->at(cur->size()-1) != "[") {
        cur->push_back(")");
        subgen(result, cur, openC, closedC + 1, openS, closedS, n);
        cur->pop_back();
    }
}

int main(void) {
    // freopen("brackets2.in", "r", stdin);
    // freopen("brackets2.out", "w", stdout);
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int n;

    cin >> n;

    vector<string> temp;
    vector<string> result;

    subgen(&result, &temp, 0, 0, 0, 0, n);

    int len = result.size();

    for ( int i = 0; i < len; i++ ) {
        cout << result[i] << "\n";
    }

    return 0;
}
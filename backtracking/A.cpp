// #include<bits/stdc++.h>
#include <iostream>
#include <vector>
#include <fstream>
#include <queue>
#include <stack>
#include <string>

using namespace std;

void permutation (int n, vector<int> *temp, vector<int> *result, int cur) {
    if ( temp->size() == n ) {
        int num = 0;
        
        for ( int i = 0; i < n; i++ ) {
            num = num*10 + temp->at(i);
        }

        result->push_back(num);
        return;
    }

    for (int i = 0; i < n; i++) {
        if ((cur & (1 << (i + 1))) == 0) {
            temp->push_back(i+1);
            cur |= 1 << (i + 1);
            permutation(n, temp, result, cur);
            cur ^= 1 << (i + 1);
            temp->pop_back();
        }
    }

    return;
}

int main (void) {
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int n;
    
    cin >> n;

    vector<int>result;
    vector<int>temp;
    
    permutation(n, &temp, &result, 0);

    int len = result.size();

    for ( int i = 0; i < len; i++  ) {
        if ( i != len - 1) {
            cout << result[i] << endl;
        } else {
            cout << result[i];
        }
    }
    return 0;
}
// #include<bits/stdc++.h>
#include <iostream>
#include <vector>
#include <fstream>
#include <queue>
#include <stack>
#include <string>

using namespace std;

void splitGraph (vector<vector<int> > *matrix, int n, vector<int> *ans, int *max, int cur, vector<int> *one, vector<int> *two, int cMax) {
    if ( one->size() + two->size() == n ) {
        if ( *max < cMax ) {
            for ( int i = 0; i < one->size(); i++ ) {
                ans->at(one->at(i)) = 1;
            }
            
            for ( int i = 0; i < two->size(); i++ ) {
                ans->at(two->at(i)) = 2;
            }

            *max = cMax;
        }
    } else {
        int curMax = cMax;
        int sum = 0;

        one->push_back(cur);
        int len = two->size();
        for ( int j = 0; j < len; j++  ) {
            sum += matrix->at(cur)[two->at(j)];
        }
        splitGraph(matrix, n, ans, max, cur+1, one, two, cMax+sum);
        one->pop_back();

        two->push_back(cur);
        sum = 0;
        len = one->size();
        for ( int j = 0; j < len; j++  ) {
            sum += matrix->at(cur)[one->at(j)];
        }
        splitGraph(matrix, n, ans, max, cur+1, one, two, cMax+sum);
        two->pop_back();
    }
}

int main (void) {
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int n;
    
    cin >> n;
    
    vector< vector<int> > adjs(n, vector<int>(n,0));
    vector< int > ans(n,0);
    vector< int > one;
    vector< int > two;

    for ( int i = 0; i < n; i++ ) {
        for ( int j = 0; j < n; j++ ) {
            cin >> adjs[i][j];
        }
    }

    int max = -1;
    
    splitGraph(&adjs, n, &ans, &max, 0, &one, &two, 0);

    cout << max << endl;

    for ( int &a : ans ) {
        cout << a << " ";
    }

    return 0;
}
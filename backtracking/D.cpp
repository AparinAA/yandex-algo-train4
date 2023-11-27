// #include <bits/stdc++.h>
#include <iostream>
#include <vector>
#include <fstream>
#include <queue>
#include <stack>
#include <string>

using namespace std;

void recursion (int visited, vector< vector<int> > &matrix, int n, int len, int curV, int *min, int full) {
    visited |= 1 << curV;

    if ( full + 1 == n ) {
        
        int w = matrix[curV][0];
        if ( *min > len + w ) {
            *min = len + w;
        }
    
    } else {
        for ( int i = 0; i < n; i++ ) {
            if ( matrix[curV][i] > 0 ) {
                int w = matrix[curV][i];
                if ( !(visited & (1 << i)) && len + w < *min ) {
                    int route = len + w;
                    recursion(visited, matrix, n, route, i, min, full+1);
                }
            }
        }
    }

    visited ^= 1 << curV;
}

int main(void) {
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int n;
    
    cin >> n;
    
    vector< vector<int> > adjs(n, vector<int>(n));
    int visited = 0;

    for ( int i = 0; i < n; i++ ) {
        for ( int j = 0; j < n; j++ ) {
            cin >> adjs[i][j];
        }
    }

    int best = INT32_MAX;

    recursion(visited, adjs, n, 0, 0, &best, 0);

    int ans = best == INT32_MAX ? -1 : best;

    cout << ans;

    return 0;
}
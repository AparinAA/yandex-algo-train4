// #include<bits/stdc++.h>
#include <iostream>
#include <fstream>
#include <queue>
#include <vector>

#define ll = long long;

using namespace std;
int main(){
    freopen("input.txt","r",stdin);
    freopen("output.txt","w",stdout);

    long long N, K;
    cin >> N >> K;
    
    long long a, b, c;
    long long s,f;

    vector< vector< pair<long long,long long> > > adjs(N+1);
    vector<long long> dist(N+1, INT64_MAX);

    priority_queue< pair<long long,long long> > heap;

    for ( int i = 0; i < K; i++ ) {
        cin >> a >> b >> c;
        
        pair<long long, long long> adj1(b,c);
        pair<long long, long long> adj2(a,c);
        adjs[a].push_back(adj1);
        adjs[b].push_back(adj2);
    }

    cin >> s >> f;

    dist[s] = 0;
    pair<long long, long long> cur(0,s);
    heap.push(cur);
    pair<long long, long long> temp;

    while ( !heap.empty() ) {
        temp = heap.top();
        heap.pop();

        if ( dist[temp.second] < -temp.first ) {
            continue;
        }
        
        for ( auto &adj : adjs[temp.second] ) {
            if ( dist[adj.first] > dist[temp.second] + adj.second ) {
                dist[adj.first] = dist[temp.second] + adj.second;

                pair<long long, long long> cr(-dist[adj.first], adj.first);
                heap.push(cr);
            }
        }
    }

    long long ans = dist[f] == INT64_MAX ? -1 : dist[f];

    cout << ans;

    adjs.clear();
    dist.clear();
    
    return 0;
}    